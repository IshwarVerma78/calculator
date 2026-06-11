// js/calculator.js

const Calculator = {
    currentValue: "0",
    previousValue: "",
    operator: null,
    shouldResetDisplay: false,
    lastExpression: "",

    // Arithmetic
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) return "Error: / by 0";
        return a / b;
    },

    // Number input
    handleNumber(num) {
        if (this.shouldResetDisplay) {
            this.currentValue = num;
            this.shouldResetDisplay = false;
        } else {
            this.currentValue =
                this.currentValue === "0"
                    ? num
                    : this.currentValue + num;
        }

        Display.update(this.currentValue);
    },

    // Operator input
    handleOperator(op) {
        if (this.operator && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;

        Display.showExpression(`${this.previousValue} ${op}`);
    },

    // Calculate result
    calculate() {
        if (!this.operator || this.previousValue === "") return;

        const prev = parseFloat(this.previousValue);
        const curr = parseFloat(this.currentValue);

        let result;

        this.lastExpression =
            `${this.previousValue} ${this.operator} ${this.currentValue}`;

        switch (this.operator) {
            case "+":
                result = this.add(prev, curr);
                break;
            case "-":
                result = this.subtract(prev, curr);
                break;
            case "x":
            case "*":
                result = this.multiply(prev, curr);
                break;
            case "/":
                result = this.divide(prev, curr);
                break;
            default:
                return;
        }

        if (typeof result === "number") {
            result = parseFloat(result.toPrecision(10));
        }

        this.currentValue = String(result);

        this.operator = null;
        this.previousValue = "";
        this.shouldResetDisplay = true;

        Display.update(this.currentValue);
        Display.showExpression("");

        History.add(this.lastExpression, this.currentValue);
    },

    clear() {
        this.currentValue = "0";
        this.previousValue = "";
        this.operator = null;
        this.shouldResetDisplay = false;
        this.lastExpression = "";

        Display.update("0");
        Display.showExpression("");
    },

    toggleSign() {
        if (this.currentValue !== "0") {
            this.currentValue = this.currentValue.startsWith("-")
                ? this.currentValue.slice(1)
                : "-" + this.currentValue;

            Display.update(this.currentValue);
        }
    },

    percentage() {
        this.currentValue = String(parseFloat(this.currentValue) / 100);
        Display.update(this.currentValue);
    },

    handleDecimal() {
        if (this.shouldResetDisplay) {
            this.currentValue = "0.";
            this.shouldResetDisplay = false;
        } else if (!this.currentValue.includes(".")) {
            this.currentValue += ".";
        }

        Display.update(this.currentValue);
    },

    deleteLast() {
        this.currentValue =
            this.currentValue.length > 1
                ? this.currentValue.slice(0, -1)
                : "0";

        Display.update(this.currentValue);
    }
};