document.addEventListener("keydown", (e) => {

    if (e.key >= "0" && e.key <= "9") {
        Calculator.handleNumber(e.key);
    }

    if (e.key === "+") Calculator.handleOperator("+");
    if (e.key === "-") Calculator.handleOperator("-");
    if (e.key === "*") Calculator.handleOperator("x");

    if (e.key === "/") {
        e.preventDefault();
        Calculator.handleOperator("/");
    }

    if (e.key === "Enter" || e.key === "=") {
        Calculator.calculate();
    }

    if (e.key === ".") Calculator.handleDecimal();

    if (e.key === "Backspace") Calculator.deleteLast();

    if (e.key === "Escape") Calculator.clear();
});