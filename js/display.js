// js/display.js

const Display = {

    update(value) {
        const resultEl = document.getElementById("result");
        if (!resultEl) return;

        resultEl.textContent = value;

        if (String(value).startsWith("Error")) {
            resultEl.classList.add("error");
        } else {
            resultEl.classList.remove("error");
        }
    },

    showExpression(expr) {
        const exprEl = document.getElementById("expression");
        if (!exprEl) return;

        exprEl.textContent = expr;
    },

    showError(msg) {
        this.update("Error: " + msg);
    }
};