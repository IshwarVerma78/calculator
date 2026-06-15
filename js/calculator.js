/* ============================================================
   calculator.js — Pure logic module. ZERO DOM access.
   Exposes a global `Calculator` object consumed by all other
   modules. All arithmetic, state management, and side-effect-
   free helper functions live here.
   ============================================================ */

/**
 * Calculator — central state and logic object.
 *
 * Convention:
 *  - Properties hold the current calculator state.
 *  - Methods mutate state and delegate rendering to Display / History.
 *  - No `document.*` calls ever appear in this file.
 */
const Calculator = {

  /* ── State ─────────────────────────────────────────────── */

  /** The number currently shown in the result display */
  currentValue: '0',

  /** The first operand waiting for a second operand + operator */
  previousValue: '',

  /** Pending operator symbol: '+', '−', '×', or '÷' (null = none) */
  operator: null,

  /**
   * When true, the next digit press replaces currentValue rather
   * than appending. Set after an operator or equals press.
   */
  shouldResetDisplay: false,

  /** Stores the last complete expression string for the history log */
  lastExpression: '',

  /* ── Pure Arithmetic Functions ─────────────────────────── */

  /**
   * add — returns the sum of two numbers.
   * @param {number} a - First operand
   * @param {number} b - Second operand
   * @returns {number}
   */
  add(a, b) {
    return a + b;
  },

  /**
   * subtract — returns the difference of two numbers.
   * @param {number} a - Minuend
   * @param {number} b - Subtrahend
   * @returns {number}
   */
  subtract(a, b) {
    return a - b;
  },

  /**
   * multiply — returns the product of two numbers.
   * @param {number} a - Multiplicand
   * @param {number} b - Multiplier
   * @returns {number}
   */
  multiply(a, b) {
    return a * b;
  },

  /**
   * divide — returns the quotient of two numbers.
   * Guards against division by zero and returns an error string
   * that the display module will style in red.
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number|string}
   */
  divide(a, b) {
    if (b === 0) return 'Error: / by 0';
    return a / b;
  },

  /* ── Input Handlers ────────────────────────────────────── */

  /**
   * handleNumber — appends or replaces a digit in currentValue.
   *
   * Rules:
   *  1. If shouldResetDisplay is true (post-operator or post-equals),
   *     start a fresh number instead of appending.
   *  2. Prevent leading zeros (e.g. typing 0 then 7 → "7" not "07").
   *  3. Delegate rendering to Display.update().
   *
   * @param {string} num - The digit string '0'–'9'
   */
  handleNumber(num) {
    if (this.shouldResetDisplay) {
      // Begin fresh entry after an operator or result
      this.currentValue = num;
      this.shouldResetDisplay = false;
    } else if (this.currentValue === '0') {
      // Replace the placeholder zero (avoid leading zeros)
      this.currentValue = num;
    } else {
      // Append digit to existing value
      this.currentValue += num;
    }
    Display.update(this.currentValue);
  },

  /**
   * handleOperator — stores the operator and, if one is already
   * pending, chains the calculation first (e.g. 5 + 3 × → resolves
   * 5+3=8 before registering ×).
   *
   * @param {string} op - Operator symbol: '+', '−', '×', or '÷'
   */
  handleOperator(op) {
    // If an operator is already set and the user hasn't typed a new
    // number yet, just swap the operator without calculating.
    if (this.operator && this.shouldResetDisplay) {
      this.operator = op;
      // Update expression line to reflect the new operator
      Display.showExpression(this.previousValue + ' ' + op);
      // Update active-state highlight on operator buttons
      this._updateOperatorHighlight(op);
      return;
    }

    // If there is a pending operator AND the user typed a second
    // number, chain: resolve the pending calculation first.
    if (this.operator && !this.shouldResetDisplay) {
      this.calculate();
    }

    // Store state for the upcoming calculation
    this.previousValue = this.currentValue;
    this.operator = op;
    this.shouldResetDisplay = true;

    // Show the expression in the secondary display line
    Display.showExpression(this.previousValue + ' ' + op);

    // Highlight the active operator button (visual feedback)
    this._updateOperatorHighlight(op);
  },

  /**
   * calculate — resolves the pending operation (previousValue op
   * currentValue) and updates the display + history.
   *
   * Guard: does nothing if no operator or no previousValue is set,
   * so pressing = with nothing pending is safe.
   */
  calculate() {
    // Guard: nothing to calculate
    if (!this.operator || this.previousValue === '') return;

    const a = parseFloat(this.previousValue);
    const b = parseFloat(this.currentValue);

    // Record the full expression string before we mutate state
    this.lastExpression = `${this.previousValue} ${this.operator} ${this.currentValue}`;

    let result;

    // Dispatch to the correct pure arithmetic function
    switch (this.operator) {
      case '+': result = this.add(a, b);      break;
      case '−': result = this.subtract(a, b); break;
      case '×': result = this.multiply(a, b); break;
      case '÷': result = this.divide(a, b);   break;
      default:  return; // Unknown operator — abort safely
    }

    // Fix floating-point imprecision (e.g. 0.1 + 0.2 → 0.3 not 0.30000000000000004)
    if (typeof result === 'number') {
      result = parseFloat(result.toPrecision(10));
    }

    // Update state
    this.currentValue = String(result);
    this.operator = null;
    this.previousValue = '';
    this.shouldResetDisplay = true; // Next digit starts a fresh number

    // Remove operator highlight — calculation complete
    this._updateOperatorHighlight(null);

    // Update the display
    Display.update(this.currentValue);
    Display.showExpression('');

    // Log to history (History module guards against empty/null)
    History.add(this.lastExpression, this.currentValue);
    History.render();
  },

  /**
   * clear — resets all state to initial values (equivalent to AC).
   * Called by the AC button and the Escape key.
   */
  clear() {
    this.currentValue      = '0';
    this.previousValue     = '';
    this.operator          = null;
    this.shouldResetDisplay = false;
    this.lastExpression    = '';

    // Remove any operator button highlight
    this._updateOperatorHighlight(null);

    Display.update('0');
    Display.showExpression('');
  },

  /**
   * toggleSign — flips the sign of currentValue between positive
   * and negative. Handles the edge case where currentValue is '0'
   * (no sign change needed).
   */
  toggleSign() {
    if (this.currentValue === '0') return; // −0 makes no sense

    if (this.currentValue.startsWith('-')) {
      // Currently negative → remove the minus
      this.currentValue = this.currentValue.slice(1);
    } else {
      // Currently positive → prepend minus
      this.currentValue = '-' + this.currentValue;
    }
    Display.update(this.currentValue);
  },

  /**
   * percentage — converts currentValue to its percentage equivalent
   * by dividing by 100. Useful for "20% of something" chains.
   */
  percentage() {
    this.currentValue = String(parseFloat(this.currentValue) / 100);
    Display.update(this.currentValue);
  },

  /**
   * handleDecimal — appends a decimal point if one doesn't already
   * exist. If shouldResetDisplay is true, starts "0." instead.
   */
  handleDecimal() {
    if (this.shouldResetDisplay) {
      // Start a fresh decimal number after an operator / equals
      this.currentValue      = '0.';
      this.shouldResetDisplay = false;
    } else if (!this.currentValue.includes('.')) {
      // Only add decimal if none exists (prevents "3.1.4" etc.)
      this.currentValue += '.';
    }
    Display.update(this.currentValue);
  },

  /**
   * deleteLast — removes the rightmost character (Backspace key).
   * Falls back to '0' when the result would be empty or just a
   * minus sign so the display is never blank.
   */
  deleteLast() {
    if (this.shouldResetDisplay) return; // Don't backspace a result

    if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
      // If we just erased to a bare minus, reset to '0'
      if (this.currentValue === '-') this.currentValue = '0';
    } else {
      this.currentValue = '0';
    }
    Display.update(this.currentValue);
  },

  /* ── Private Helpers ───────────────────────────────────── */

  /**
   * _updateOperatorHighlight — adds/removes the `is-active` CSS
   * class on operator buttons to show which operator is pending.
   * Prefixed with _ to signal it is internal (not called externally).
   *
   * @param {string|null} activeOp - The currently selected operator,
   *                                 or null to clear all highlights.
   */
  _updateOperatorHighlight(activeOp) {
    // Map symbol → button element ID
    const map = { '+': 'btn-add', '−': 'btn-sub', '×': 'btn-mul', '÷': 'btn-div' };

    // Remove highlight from all operator buttons first
    Object.values(map).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('is-active');
    });

    // Apply highlight to the active operator (if any)
    if (activeOp && map[activeOp]) {
      const el = document.getElementById(map[activeOp]);
      if (el) el.classList.add('is-active');
    }
  }

}; // end Calculator
