// js/keyboard.js — Maps keyboard keys to calculator actions

document.addEventListener('keydown', (e) => {

  // Number keys 0–9
  if (e.key >= '0' && e.key <= '9') {
    Calculator.handleNumber(e.key);
    Display.update(Calculator.currentValue);
  }

  // Operators
  if (e.key === '+') Calculator.handleOperator('+');
  if (e.key === '-') Calculator.handleOperator('-');
  if (e.key === '*') Calculator.handleOperator('×');
  if (e.key === '/') {
    e.preventDefault(); // prevents browser's "find" shortcut
    Calculator.handleOperator('÷');
  }

  // Equals — Enter key
  if (e.key === 'Enter' || e.key === '=') {
    Calculator.calculate();
    Display.update(Calculator.currentValue);
    History.add(Calculator.lastExpression, Calculator.currentValue);
    History.render();
  }

  // Decimal point
  if (e.key === '.') Calculator.handleDecimal();

  // Backspace — delete last character
  if (e.key === 'Backspace') Calculator.deleteLast();

  // Escape — All Clear
  if (e.key === 'Escape') Calculator.clear();
});