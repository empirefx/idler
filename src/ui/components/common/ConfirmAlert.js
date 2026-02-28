/**
 * ConfirmAlert.js
 * ---------------------------------------------------------------
 * Reusable Confirmation Alert / Dialog component
 *
 * Usage example
 * ─────────────
 *   import React from 'react';
 *   import ConfirmAlert from './ConfirmAlert';
 *   import './ConfirmAlert.css';
 *
 *   function App() {
 *     const [open, setOpen] = React.useState(false);
 *
 *     return React.createElement(React.Fragment, null,
 *       React.createElement('button', { onClick: () => setOpen(true) }, 'Delete item'),
 *       React.createElement(ConfirmAlert, {
 *         open,
 *         title:          'Delete this item?',
 *         message:        'This action cannot be undone.',
 *         variant:        'danger',            // 'default' | 'danger' | 'warning' | 'info'
 *         confirmLabel:   'Yes, delete',
 *         cancelLabel:    'Keep it',
 *         onConfirm:      () => { doDelete(); setOpen(false); },
 *         onCancel:       () => setOpen(false),
 *       })
 *     );
 *   }
 *
 * Config props (all optional — defaults shown)
 * ─────────────────────────────────────────────
 *   open           {boolean}   false          — controls visibility
 *   title          {string}    'Are you sure?' — dialog heading
 *   message        {string}    'Do you want to proceed?' — body text
 *   variant        {string}    'default'      — 'default'|'danger'|'warning'|'info'
 *   icon           {string}    (auto)         — emoji / text icon; '' to hide
 *   confirmLabel   {string}    'Confirm'      — confirm button text
 *   cancelLabel    {string}    'Cancel'       — cancel button text
 *   showCancel     {boolean}   true           — show / hide cancel button
 *   showClose      {boolean}   false          — × close button in corner
 *   stacked        {boolean}   false          — stack buttons vertically
 *   closeOnOverlay {boolean}   true           — click backdrop to cancel
 *   closeOnEsc     {boolean}   true           — Escape key triggers cancel
 *   overlay        {boolean}   true           — show backdrop/blur behind panel;
 *                                               false = panel floats with no background at all
 *   loading        {boolean}   false          — show spinner on confirm btn
 *   onConfirm      {function}  noop           — called on confirm click
 *   onCancel       {function}  noop           — called on cancel / close
 *   onClose        {function}  (uses onCancel) — alias for any close gesture
 * ---------------------------------------------------------------
 */

var React = require('react');
import "./../../../styles/components/ConfirmAlert.css";

/* ── Default configuration ──────────────────────────────────────── */
var DEFAULTS = {
  open:           false,
  title:          'Are you sure?',
  message:        'Do you want to proceed with this action?',
  variant:        'default',
  icon:           null,          // null = auto-pick by variant
  confirmLabel:   'Confirm',
  cancelLabel:    'Cancel',
  showCancel:     true,
  showClose:      false,
  stacked:        false,
  overlay:        true,
  closeOnOverlay: true,
  closeOnEsc:     true,
  loading:        false,
  onConfirm:      function() {},
  onCancel:       function() {},
  onClose:        null,
};

/* ── Auto icon map ─────────────────────────────────────────────── */
var VARIANT_ICONS = {
  default: '✦',
  danger:  '⚠',
  warning: '!',
  info:    'ℹ',
};

/* ── Merge props with defaults ─────────────────────────────────── */
function cfg(props) {
  var out = {};
  var keys = Object.keys(DEFAULTS);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    out[k] = props[k] !== undefined ? props[k] : DEFAULTS[k];
  }
  // onClose falls back to onCancel
  out.onClose = props.onClose || out.onCancel;
  // icon falls back to variant default when null
  if (out.icon === null) out.icon = VARIANT_ICONS[out.variant] || VARIANT_ICONS.default;
  return out;
}

/* ═══════════════════════════════════════════════════════════════
   ConfirmAlert component
═══════════════════════════════════════════════════════════════ */
function ConfirmAlert(rawProps) {
  var p = cfg(rawProps);

  /* ── Esc key handler ── */
  React.useEffect(function() {
    if (!p.open || !p.closeOnEsc) return;
    function onKey(e) {
      if (e.key === 'Escape') p.onClose();
    }
    document.addEventListener('keydown', onKey);
    return function() { document.removeEventListener('keydown', onKey); };
  }, [p.open, p.closeOnEsc, p.onClose]);

  /* ── Focus trap: move focus into panel when opened ── */
  var panelRef = React.useRef(null);
  React.useEffect(function() {
    if (p.open && panelRef.current) {
      var first = panelRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (first) first.focus();
    }
  }, [p.open]);

  /* ── Scroll lock (only when overlay covers the page) ── */
  React.useEffect(function() {
    if (p.open && p.overlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return function() { document.body.style.overflow = ''; };
  }, [p.open, p.overlay]);

  /* ── Don't render at all when closed ── */
  if (!p.open) return null;

  /* ── Overlay click ── */
  function handleOverlayClick(e) {
    if (p.closeOnOverlay && e.target === e.currentTarget) {
      p.onClose();
    }
  }

  /* ── Build action buttons ── */
  var confirmBtn = React.createElement('button', {
    className: 'ca-btn ca-btn-confirm',
    type: 'button',
    disabled: p.loading,
    onClick: p.onConfirm,
    'aria-busy': p.loading ? 'true' : 'false',
  },
    p.loading
      ? React.createElement('span', { className: 'ca-btn-spinner', 'aria-hidden': 'true' })
      : null,
    p.loading ? 'Working…' : p.confirmLabel
  );

  var cancelBtn = p.showCancel
    ? React.createElement('button', {
        className: 'ca-btn ca-btn-cancel',
        type: 'button',
        onClick: p.onClose,
      }, p.cancelLabel)
    : null;

  var actionsClass = 'ca-actions' + (p.stacked ? ' ca-stacked' : '');

  /* ── Close (×) button ── */
  var closeBtn = p.showClose
    ? React.createElement('button', {
        className: 'ca-close',
        type: 'button',
        'aria-label': 'Close dialog',
        onClick: p.onClose,
      }, '×')
    : null;

  /* ── Panel ── */
  var panel = React.createElement('div', {
    ref: panelRef,
    className: 'ca-panel ca-variant-' + p.variant,
    role: 'alertdialog',
    'aria-modal': 'true',
    'aria-labelledby': 'ca-title',
    'aria-describedby': 'ca-message',
  },
    closeBtn,

    React.createElement('div', { className: 'ca-body' },

      /* icon */
      p.icon
        ? React.createElement('div', {
            className: 'ca-icon',
            'aria-hidden': 'true',
          }, p.icon)
        : null,

      /* title */
      React.createElement('h2', {
        id: 'ca-title',
        className: 'ca-title',
      }, p.title),

      /* message */
      React.createElement('p', {
        id: 'ca-message',
        className: 'ca-message',
      }, p.message),

      /* divider */
      React.createElement('div', { className: 'ca-divider', 'aria-hidden': 'true' }),

      /* actions */
      React.createElement('div', { className: actionsClass },
        cancelBtn,
        confirmBtn
      )
    )
  );

  /* ── Overlay ── */
  return React.createElement('div', {
    className: 'ca-overlay' + (p.overlay ? '' : ' ca-overlay--bare'),
    role: 'presentation',
    onClick: handleOverlayClick,
  }, panel);
}

module.exports = ConfirmAlert;
