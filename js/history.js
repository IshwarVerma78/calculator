// js/history.js

const MAX_HISTORY_ITEMS = 5;

const History = {

    entries: [],

    add(expression, result) {
        if (!expression) return;

        this.entries.unshift({ expression, result });

        if (this.entries.length > MAX_HISTORY_ITEMS) {
            this.entries.pop();
        }

        this.render();
    },

    render() {
        const listEl = document.querySelector(".history-list");
        if (!listEl) return;

        listEl.innerHTML = "";

        this.entries.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.expression} = ${item.result}`;
            listEl.appendChild(li);
        });
    },

    clear() {
        this.entries = [];
        this.render();
    }
};