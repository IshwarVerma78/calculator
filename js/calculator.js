// js/calculator.js - core calculator state and operations

const OP_SUBTRACT = '\u2212';
const OP_MULTIPLY = '\u00d7';
const OP_DIVIDE = '\u00f7';

const Calculator = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  shouldResetDisplay: false,
  lastExpression: '',

  add(a, b) {
    return a + b;
  },

  subtract(a, b) {
    return a - b;
  },

  multiply(a, b) {
    return a * b;
  },

  divide(a, b) {
    if (b === 0) return 'Error: / by 0';
    return a / b;
  },

  handleNumber(num) {
    if (this.shouldResetDisplay || this._isErrorValue(this.currentValue)) {
      this.currentValue = num;
      this.shouldResetDisplay = false;
    } else if (this.currentValue === '0') {
      this.currentValue = num;
    } else {
      this.currentValue += num;
    }

    Display.update(this.currentValue);
  },

  handleOperator(op) {
    const normalizedOp = this._normalizeOperator(op);
    if (!normalizedOp || this._isErrorValue(this.currentValue)) return;

    if (this.operator && this.shouldResetDisplay) {
      this.operator = normalizedOp;
      Display.showExpression(`${this.previousValue} ${normalizedOp}`);
      this._updateOperatorHighlight(normalizedOp);
      return;
    }

    if (this.operator && !this.shouldResetDisplay) {
      this.calculate();
    }

    this.previousValue = this.currentValue;
    this.operator = normalizedOp;
    this.shouldResetDisplay = true;

    Display.showExpression(`${this.previousValue} ${normalizedOp}`);
    this._updateOperatorHighlight(normalizedOp);
  },

  calculate() {
    if (!this.operator || this.previousValue === '') return;

    const previous = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    if (Number.isNaN(previous) || Number.isNaN(current)) return;

    this.lastExpression = `${this.previousValue} ${this.operator} ${this.currentValue}`;

    let result;

    switch (this.operator) {
      case '+':
        result = this.add(previous, current);
        break;
      case OP_SUBTRACT:
        result = this.subtract(previous, current);
        break;
      case OP_MULTIPLY:
        result = this.multiply(previous, current);
        break;
      case OP_DIVIDE:
        result = this.divide(previous, current);
        break;
      default:
        return;
    }

    if (typeof result === 'number') {
      result = parseFloat(result.toPrecision(10));
    }

    this.currentValue = String(result);
    this.operator = null;
    this.previousValue = '';
    this.shouldResetDisplay = true;

    this._updateOperatorHighlight(null);
    Display.update(this.currentValue);
    Display.showExpression('');
    History.add(this.lastExpression, this.currentValue);
  },

  clear() {
    this.currentValue = '0';
    this.previousValue = '';
    this.operator = null;
    this.shouldResetDisplay = false;
    this.lastExpression = '';

    this._updateOperatorHighlight(null);
    Display.update('0');
    Display.showExpression('');
  },

  toggleSign() {
    if (this.currentValue === '0' || this._isErrorValue(this.currentValue)) return;

    this.currentValue = this.currentValue.startsWith('-')
      ? this.currentValue.slice(1)
      : `-${this.currentValue}`;

    Display.update(this.currentValue);
  },

  percentage() {
    if (this._isErrorValue(this.currentValue)) return;

    this.currentValue = String(parseFloat(this.currentValue) / 100);
    Display.update(this.currentValue);
  },

  handleDecimal() {
    if (this.shouldResetDisplay || this._isErrorValue(this.currentValue)) {
      this.currentValue = '0.';
      this.shouldResetDisplay = false;
    } else if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
    }

    Display.update(this.currentValue);
  },

  deleteLast() {
    if (this.shouldResetDisplay || this._isErrorValue(this.currentValue)) return;

    if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
      if (this.currentValue === '-') this.currentValue = '0';
    } else {
      this.currentValue = '0';
    }

    Display.update(this.currentValue);
  },

  _normalizeOperator(op) {
    const map = {
      '+': '+',
      '-': OP_SUBTRACT,
      [OP_SUBTRACT]: OP_SUBTRACT,
      x: OP_MULTIPLY,
      X: OP_MULTIPLY,
      '*': OP_MULTIPLY,
      [OP_MULTIPLY]: OP_MULTIPLY,
      '/': OP_DIVIDE,
      [OP_DIVIDE]: OP_DIVIDE
    };

    return map[op] || null;
  },

  _isErrorValue(value) {
    return String(value).startsWith('Error');
  },

  _updateOperatorHighlight(activeOp) {
    const buttonByOperator = {
      '+': 'btn-add',
      [OP_SUBTRACT]: 'btn-sub',
      [OP_MULTIPLY]: 'btn-mul',
      [OP_DIVIDE]: 'btn-div'
    };

    Object.values(buttonByOperator).forEach(id => {
      const button = document.getElementById(id);
      if (button) button.classList.remove('is-active');
    });

    if (activeOp && buttonByOperator[activeOp]) {
      const activeButton = document.getElementById(buttonByOperator[activeOp]);
      if (activeButton) activeButton.classList.add('is-active');
    }
  }
};
