/* ============================================================
   history.js — Last-5-calculations panel logic.
   Maintains an in-memory array of recent results and renders
   them into the .history-list <ul> element.
   ============================================================ */

/**
 * History — stores and renders the last 5 calculations.
 *
 * Layout contract:
 *   - Most recent entry appears at the TOP of the list.
 *   - Entries are stored as { expression, result } objects.
 *   - Maximum 5 entries are kept; older ones are discarded.
 */
const History = {

  /* ── Constants ─────────────────────────────────────────── */

  /** Maximum number of history entries to retain */
  MAX_ENTRIES: 5,

  /* ── State ─────────────────────────────────────────────── */

  /**
   * entries — the ordered array of recent calculations.
   * Index 0 = most recent (unshift logic keeps this invariant).
   * @type {Array<{expression: string, result: string}>}
   */
  entries: [],

  /* ── Cached DOM Reference ──────────────────────────────── */

  /** Lazy-cached reference to the .history-list <ul> element */
  _listEl: null,

  /**
   * _getList — lazily fetches and caches the .history-list element.
   * @returns {HTMLElement}
   */
  _getList() {
    if (!this._listEl) {
      this._listEl = document.querySelector('.history-list');
    }
    return this._listEl;
  },

  /* ── Public API ────────────────────────────────────────── */

  /**
   * add — prepends a new calculation entry to the history array.
   *
   * Guards:
   *  - Skips if expression or result is empty / null / undefined.
   *  - Skips if the result itself starts with 'Error' (don't
   *    pollute the history with error states).
   *
   * After inserting, trims the array to MAX_ENTRIES and re-renders.
   *
   * @param {string} expression - e.g. "5 + 3 × 2"
   * @param {string} result     - e.g. "16"
   */
  add(expression, result) {
    // Guard: reject empty or null entries
    if (!expression || !result) return;

    // Guard: don't store error results in history
    if (String(result).startsWith('Error')) return;

    // Prepend so index 0 is always the most recent
    this.entries.unshift({ expression, result });

    // Trim to the maximum allowed entries
    this.entries = this.entries.slice(0, this.MAX_ENTRIES);

    // Re-render the panel
    this.render();
  },

  /**
   * render — clears the <ul> and rebuilds it from the entries array.
   *
   * Each entry creates one <li> with the text:
   *   "expression = result"
   * Formatting the equals sign makes entries easy to scan at a glance.
   */
  render() {
    const list = this._getList();
    if (!list) return; // Safety check if DOM not ready

    // Clear existing entries
    list.innerHTML = '';

    // Build and append an <li> for each history entry
    this.entries.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.expression} = ${entry.result}`;
      // Accessible label for screen readers
      li.setAttribute('aria-label', `Previous calculation: ${li.textContent}`);
      list.appendChild(li);
    });
  },

  /**
   * clear — empties the entries array and clears the rendered list.
   * Could be wired to a "clear history" button if desired.
   */
  clear() {
    this.entries = [];
    this.render();
  }

}; // end History
