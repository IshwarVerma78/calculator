/* ============================================================
   display.js — All DOM screen updates.
   This is the ONLY file that directly reads/writes DOM nodes.
   It receives data from Calculator and formats it for the user.
   ============================================================ */

/**
 * Display — handles every visual update to the calculator screen.
 *
 * Responsibilities:
 *  - Render the current value in #result
 *  - Render the pending expression in #expression
 *  - Apply/remove error styling
 *  - Auto-shrink font size for long numbers so they don't overflow
 */
const Display = {

  /* ── Cached DOM References ─────────────────────────────── */
  // Cached on first use so we don't query the DOM repeatedly.
  _resultEl: null,
  _expressionEl: null,

  /**
   * _getResult — lazily fetches and caches the #result element.
   * @returns {HTMLElement}
   */
  _getResult() {
    if (!this._resultEl) this._resultEl = document.getElementById('result');
    return this._resultEl;
  },

  /**
   * _getExpression — lazily fetches and caches the #expression element.
   * @returns {HTMLElement}
   */
  _getExpression() {
    if (!this._expressionEl) this._expressionEl = document.getElementById('expression');
    return this._expressionEl;
  },

  /* ── Public API ────────────────────────────────────────── */

  /**
   * update — sets the main result line to the given value.
   *
   * If `value` starts with 'Error':
   *   - Adds the CSS class `error` (turns text red, reduces font-size).
   * Otherwise:
   *   - Removes `error` class and displays the number normally.
   *   - Calls _autoShrink() to prevent overflow for long numbers.
   *
   * @param {string} value - The string to display (number or error)
   */
  update(value) {
    const el = this._getResult();

    if (String(value).startsWith('Error')) {
      // Error state: style in red via CSS class
      el.textContent = value;
      el.classList.add('error');
    } else {
      // Normal number state
      el.textContent = value;
      el.classList.remove('error');
      this._autoShrink(el, value);
    }
  },

  /**
   * showExpression — sets the secondary (top) line in the display.
   * Shows the pending expression, e.g. "5 + 3 ×".
   * Pass an empty string '' to clear the line.
   *
   * @param {string} expr - Expression text (may be empty)
   */
  showExpression(expr) {
    const el = this._getExpression();
    el.textContent = expr;
  },

  /**
   * showError — convenience wrapper that prefixes a message with
   * "Error: " and calls update(), triggering the error styles.
   *
   * @param {string} msg - The error description
   */
  showError(msg) {
    this.update('Error: ' + msg);
  },

  /* ── Private Helpers ───────────────────────────────────── */

  /**
   * _autoShrink — dynamically reduces the font-size of the result
   * element when the displayed number is too long to fit, preventing
   * text from overflowing the display area.
   *
   * Thresholds are chosen to work with the default 80px button size.
   * These values are adjusted if needed via the CSS variable --btn-size.
   *
   * @param {HTMLElement} el     - The #result element
   * @param {string}      value  - The string being displayed
   */
  _autoShrink(el, value) {
    const len = String(value).length;

    if (len > 15) {
      el.style.fontSize = '1.2rem';
    } else if (len > 12) {
      el.style.fontSize = '1.6rem';
    } else if (len > 9) {
      el.style.fontSize = '2.2rem';
    } else {
      // Restore the CSS-variable default
      el.style.fontSize = '';
    }
  }

}; // end Display
