// js/calculator.js

const Calculator = {
    // State Variables
    currentValue: "0",
    previousValue: "",
    operator: null,
    shouldResetDisplay: false,
    lastExpression: "",

    // Arithmetic Functions
    add: (a, b) => a + b,

    subtract: (a, b) => a - b,

    multiply: (a, b) => a * b,

    divide: (a, b) => {
        if (b === 0) {
            return "Error: / by 0";
        }
        return a / b;
    },

    // Number Input
    handleNumber: function(num) {
        if (this.shouldResetDisplay) {
            this.currentValue = num;
            this.shouldResetDisplay = false;
        } else {
            if (this.currentValue === "0") {
                this.currentValue = num;
            } else {
                this.currentValue += num;
            }
        }

        if (typeof Display !== "undefined") {
            Display.update(this.currentValue);
        }
    },

    // Operator Input
    handleOperator: function(op) {

        if (this.operator && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;

        if (typeof Display !== "undefined") {
            Display.showExpression(
                this.previousValue + " " + op
            );
        }
    },

    // Equals
    calculate: function() {

        if (!this.operator || this.previousValue === "") {
            return;
        }

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

            case "×":
            case "x":
            case "*":
                result = this.multiply(prev, curr);
                break;

            case "÷":
            case "/":
                result = this.divide(prev, curr);
                break;

            default:
                return;
        }

        // Fix floating point issues
        if (typeof result === "number") {
            result = parseFloat(result.toPrecision(10));
        }

        this.currentValue = String(result);

        this.operator = null;
        this.previousValue = "";
        this.shouldResetDisplay = true;

        if (typeof Display !== "undefined") {
            Display.update(this.currentValue);
            Display.showExpression("");
        }

        if (
            typeof History !== "undefined" &&
            this.lastExpression
        ) {
            History.add(
                this.lastExpression,
                this.currentValue
            );
        }
    },

    // Clear All
    clear: function() {

        this.currentValue = "0";
        this.previousValue = "";
        this.operator = null;
        this.shouldResetDisplay = false;
        this.lastExpression = "";

        if (typeof Display !== "undefined") {
            Display.update("0");
            Display.showExpression("");
        }
    },

    // Toggle Positive/Negative
    toggleSign: function() {

        if (this.currentValue !== "0") {

            if (this.currentValue.startsWith("-")) {
                this.currentValue =
                    this.currentValue.slice(1);
            } else {
                this.currentValue =
                    "-" + this.currentValue;
            }

            if (typeof Display !== "undefined") {
                Display.update(this.currentValue);
            }
        }
    },

    // Percentage
    percentage: function() {

        this.currentValue =
            String(parseFloat(this.currentValue) / 100);

        if (typeof Display !== "undefined") {
            Display.update(this.currentValue);
        }
    },

    // Decimal Point
    handleDecimal: function() {

        if (this.shouldResetDisplay) {

            this.currentValue = "0.";
            this.shouldResetDisplay = false;

        } else if (!this.currentValue.includes(".")) {

            this.currentValue += ".";
        }

        if (typeof Display !== "undefined") {
            Display.update(this.currentValue);
        }
    },

    // Backspace
    deleteLast: function() {

        if (this.currentValue.length > 1) {
            this.currentValue =
                this.currentValue.slice(0, -1);
        } else {
            this.currentValue = "0";
        }

        if (typeof Display !== "undefined") {
            Display.update(this.currentValue);
        }
    }
};