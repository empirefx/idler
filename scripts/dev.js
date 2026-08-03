// scripts/dev.js
// Runs client (parcel) + server together, streaming output to console
// AND to per-source + combined log files under ./logs for easy LLM reading.

import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, createWriteStream, existsSync, writeFileSync, readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { createConnection, createServer } from 'node:net';

const LOG_DIR = join(process.cwd(), 'logs');
mkdirSync(LOG_DIR, { recursive: true });

const pidPath = join(LOG_DIR, 'dev.pid');

// --- Minimal .env loader (no dependency) ---
// Only sets vars that aren't already in the environment, same convention as dotenv.
function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const contents = readFileSync(path, 'utf8');
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    // strip matching surrounding quotes, if any
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(join(process.cwd(), '.env'));

// --- Redis preflight check ---
// Connects and sends a raw RESP PING, verifying we get back a real PONG —
// not just that something is listening on the port.
function checkRedis(host, port, timeoutMs = 2000) {
  return new Promise((resolve) => {
    const socket = createConnection({ host, port });
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(timeoutMs, () => finish(false));
    socket.once('error', () => finish(false));
    socket.once('connect', () => {
      socket.write('PING\r\n');
    });
    socket.once('data', (data) => {
      finish(data.toString().startsWith('+PONG'));
    });
  });
}

// --- Port preflight check ---
// Tries to briefly bind the port; if that fails, something's already using it.
function checkPortFree(host, port) {
  return new Promise((resolve) => {
    const tester = createServer();
    tester.once('error', () => resolve(false));
    tester.once('listening', () => {
      tester.close(() => resolve(true));
    });
    tester.listen(port, host === '0.0.0.0' ? undefined : host);
  });
}

// --- Refuse to start a second instance ---
function isProcessAlive(pid) {
  try {
    process.kill(pid, 0); // signal 0 = test only, doesn't actually kill
    return true;
  } catch {
    return false; // ESRCH = no such process
  }
}

if (existsSync(pidPath)) {
  const existingPid = parseInt(readFileSync(pidPath, 'utf8').trim(), 10);
  if (existingPid && isProcessAlive(existingPid)) {
    console.error(
      `Already running (pid ${existingPid}). Run "npm run dev:stop" first, or press "q" in that terminal.`
    );
    process.exit(1);
  } else {
    // stale pid file from a crash/kill -9, safe to clean up
    unlinkSync(pidPath);
  }
}

const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

console.log(`Checking Redis at ${redisHost}:${redisPort}...`);
const redisUp = await checkRedis(redisHost, redisPort);
if (!redisUp) {
  console.error(`Redis is not reachable at ${redisHost}:${redisPort}`);
  process.exit(1);
}
console.log('Redis is up.\n');

const serverPort = parseInt(process.env.SERVER_PORT || '3001', 10);
const serverHost = process.env.SERVER_HOST || '0.0.0.0';

const portFree = await checkPortFree(serverHost, serverPort);
if (!portFree) {
  console.error(`Port ${serverPort} is already in use`);
  process.exit(1);
}

writeFileSync(pidPath, String(process.pid));

// Truncate logs each run so old noise doesn't confuse an LLM reading them fresh
const clientLogPath = join(LOG_DIR, 'client.log');
const serverLogPath = join(LOG_DIR, 'server.log');
const combinedLogPath = join(LOG_DIR, 'combined.log');
for (const p of [clientLogPath, serverLogPath, combinedLogPath]) {
  writeFileSync(p, '');
}

const clientStream = createWriteStream(clientLogPath, { flags: 'a' });
const serverStream = createWriteStream(serverLogPath, { flags: 'a' });
const combinedStream = createWriteStream(combinedLogPath, { flags: 'a' });

function timestamp() {
  return new Date().toISOString();
}

function pipe(proc, name, ownStream, colorCode) {
  const write = (data, stream) => {
    const lines = data.toString().split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const tagged = `[${timestamp()}] [${name}] ${line}`;
      // console: colored + prefixed
      process.stdout.write(`\x1b[${colorCode}m[${name}]\x1b[0m ${line}\n`);
      // per-source log file
      ownStream.write(tagged + '\n');
      // combined log file (both sources interleaved, chronological)
      combinedStream.write(tagged + '\n');
    }
  };

  proc.stdout.on('data', (d) => write(d, ownStream));
  proc.stderr.on('data', (d) => write(d, ownStream));
}

console.log(`Logs: ${LOG_DIR}/{client,server,combined}.log\n`);

// --- Client (parcel) ---
// NOTE: with shell:true, pass one pre-assembled string (not an args array) —
// Node otherwise warns (DEP0190) because array args get concatenated unescaped.
const client = spawn('npm run start', { shell: true, env: process.env });
pipe(client, 'client', clientStream, 36); // cyan

// --- Server ---
const server = spawn('npm run start:server', { shell: true, env: process.env });
pipe(server, 'server', serverStream, 33); // yellow

let shuttingDown = false;
function killTree(child) {
  if (!child || child.exitCode !== null || child.killed) return;
  if (process.platform === 'win32') {
    // shell:true spawns cmd.exe -> npm -> node; killing just the top process
    // leaves the real node process orphaned and still holding its port.
    // /t kills the whole tree, /f forces it.
    spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' });
  } else {
    child.kill('SIGTERM');
  }
}

function shutdown(reason) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\nShutting down client + server (${reason})...`);
  killTree(client);
  killTree(server);
  try {
    unlinkSync(pidPath);
  } catch {
    // already gone, fine
  }
  setTimeout(() => process.exit(0), 300);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// --- Press "q" to quit (interactive terminals only) ---
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  console.log('Press "q" to stop (or run "npm run dev:stop" from another terminal).\n');

  process.stdin.on('data', (key) => {
    if (key === 'q' || key === 'Q') {
      shutdown('q pressed');
    }
    if (key === '\u0003') {
      // Ctrl+C still works even in raw mode
      shutdown('SIGINT');
    }
  });
}

client.on('exit', (code) => {
  combinedStream.write(`[${timestamp()}] [client] exited with code ${code}\n`);
  if (code !== 0) {
    console.log(`client exited with code ${code}`);
    shutdown('client crashed');
  }
});
server.on('exit', (code) => {
  combinedStream.write(`[${timestamp()}] [server] exited with code ${code}\n`);
  if (code !== 0) {
    console.log(`server exited with code ${code}`);
    shutdown('server crashed');
  }
});