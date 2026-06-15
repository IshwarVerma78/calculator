// js/display.js - DOM updates for the calculator display

const Display = {
  _resultEl: null,
  _expressionEl: null,

  _getResult() {
    if (!this._resultEl) {
      this._resultEl = document.getElementById('result');
    }

    return this._resultEl;
  },

  _getExpression() {
    if (!this._expressionEl) {
      this._expressionEl = document.getElementById('expression');
    }

    return this._expressionEl;
  },

  update(value) {
    const resultEl = this._getResult();
    if (!resultEl) return;

    resultEl.textContent = value;

    if (String(value).startsWith('Error')) {
      resultEl.classList.add('error');
      resultEl.style.fontSize = '';
      return;
    }

    resultEl.classList.remove('error');
    this._autoShrink(resultEl, value);
  },

  showExpression(expr) {
    const expressionEl = this._getExpression();
    if (!expressionEl) return;

    expressionEl.textContent = expr;
  },

  showError(message) {
    this.update(`Error: ${message}`);
  },

  _autoShrink(resultEl, value) {
    const length = String(value).length;

    if (length > 15) {
      resultEl.style.fontSize = '1.2rem';
    } else if (length > 12) {
      resultEl.style.fontSize = '1.6rem';
    } else if (length > 9) {
      resultEl.style.fontSize = '2.2rem';
    } else {
      resultEl.style.fontSize = '';
    }
  }
};
