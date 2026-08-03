// scripts/dev-stop.js
// Stops the dev runner started by scripts/dev.js, using the pid file.
// This is the easiest way for an LLM/agent (or any non-interactive script)
// to shut things down, since it can't send a "q" keypress to a TTY.

import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const pidPath = join(process.cwd(), 'logs', 'dev.pid');

if (!existsSync(pidPath)) {
  console.log('Not running (no logs/dev.pid found).');
  process.exit(0);
}

const pid = parseInt(readFileSync(pidPath, 'utf8').trim(), 10);

if (!pid) {
  console.log('pid file was empty/invalid, removing it.');
  unlinkSync(pidPath);
  process.exit(0);
}

if (process.platform === 'win32') {
  // On Windows, a cross-process SIGTERM does NOT fire dev.js's 'SIGTERM'
  // handler — Node/Windows just terminates it unconditionally. That means
  // dev.js never gets a chance to run its own tree-kill on client/server,
  // leaving orphaned node processes behind. So kill the whole tree here
  // directly, and clean up the pid file ourselves since dev.js can't.
  const result = spawnSync('taskkill', ['/pid', String(pid), '/t', '/f'], { encoding: 'utf8' });
  if (result.status === 0) {
    console.log(`Killed process tree for pid ${pid}.`);
  } else {
    console.log(`No live process tree for pid ${pid} (stale pid file).`);
  }
  try {
    unlinkSync(pidPath);
  } catch {
    // already gone, fine
  }
} else {
  try {
    process.kill(pid, 'SIGTERM');
    console.log(`Sent SIGTERM to pid ${pid}. It will clean up logs/dev.pid itself.`);
  } catch (err) {
    if (err.code === 'ESRCH') {
      console.log(`No process with pid ${pid} (stale pid file). Removing it.`);
      unlinkSync(pidPath);
    } else {
      throw err;
    }
  }
}