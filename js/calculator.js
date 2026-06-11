// js/calculator.js

const Calculator = {
    currentValue: "0",
    previousValue: "",
    operator: null,
    shouldResetDisplay: false,
    lastExpression: "",

    add: (a, b) => a + b,

    subtract: (a, b) => a - b,

    multiply: (a, b) => a * b,

    divide: (a, b) => {
        if (b === 0) return "Error: / by 0";
        return a / b;
    },

    handleNumber: function(num) {
        if (this.shouldResetDisplay) {
            this.currentValue = num;
            this.shouldResetDisplay = false;
        } else {
            this.currentValue =
                this.currentValue === "0"
                    ? num
                    : this.currentValue + num;
        }
    },

    handleOperator: function(op) {
        if (this.operator && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;
    },

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
                result = this.multiply(prev, curr);
                break;

            case "÷":
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

        this.previousValue = "";
        this.operator = null;
        this.shouldResetDisplay = true;
    },

    clear: function() {
        this.currentValue = "0";
        this.previousValue = "";
        this.operator = null;
        this.shouldResetDisplay = false;
    }
};