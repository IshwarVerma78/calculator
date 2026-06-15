// js/history.js - last-five-calculations panel

const History = {
  MAX_ENTRIES: 5,
  entries: [],
  _listEl: null,

  _getList() {
    if (!this._listEl) {
      this._listEl = document.getElementById('history-list')
        || document.querySelector('.history-list');
    }

    return this._listEl;
  },

  add(expression, result) {
    if (expression == null || result == null) return;

    const entry = {
      expression: String(expression).trim(),
      result: String(result).trim()
    };

    if (!entry.expression || !entry.result) return;
    if (entry.result.startsWith('Error')) return;

    this.entries.unshift(entry);
    this.entries = this.entries.slice(0, this.MAX_ENTRIES);
    this.render();
  },

  render() {
    const list = this._getList();
    if (!list) return;

    list.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this.entries.forEach(entry => {
      const item = document.createElement('li');
      const text = `${entry.expression} = ${entry.result}`;

      item.textContent = text;
      item.setAttribute('aria-label', `Previous calculation: ${text}`);
      fragment.appendChild(item);
    });

    list.appendChild(fragment);
  },

  clear() {
    this.entries = [];
    this.render();
  }
};
