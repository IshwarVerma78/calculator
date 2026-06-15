// js/keyboard.js - keyboard shortcuts for calculator actions

const keyButtonMap = {
  '0': 'btn-0',
  '1': 'btn-1',
  '2': 'btn-2',
  '3': 'btn-3',
  '4': 'btn-4',
  '5': 'btn-5',
  '6': 'btn-6',
  '7': 'btn-7',
  '8': 'btn-8',
  '9': 'btn-9',
  '+': 'btn-add',
  '-': 'btn-sub',
  '*': 'btn-mul',
  '/': 'btn-div',
  '.': 'btn-decimal',
  ',': 'btn-decimal',
  Enter: 'btn-equals',
  '=': 'btn-equals',
  Escape: 'btn-ac',
  p: 'btn-percent',
  P: 'btn-percent',
  n: 'btn-toggle',
  N: 'btn-toggle'
};

document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  let handled = true;

  if (event.key >= '0' && event.key <= '9') {
    Calculator.handleNumber(event.key);
  } else {
    switch (event.key) {
      case '+':
      case '-':
      case '*':
      case '/':
        Calculator.handleOperator(event.key);
        break;
      case 'Enter':
      case '=':
        Calculator.calculate();
        break;
      case '.':
      case ',':
        Calculator.handleDecimal();
        break;
      case 'Backspace':
        Calculator.deleteLast();
        break;
      case 'Escape':
        Calculator.clear();
        break;
      case 'p':
      case 'P':
        Calculator.percentage();
        break;
      case 'n':
      case 'N':
        Calculator.toggleSign();
        break;
      default:
        handled = false;
    }
  }

  if (!handled) return;

  event.preventDefault();
  flashButton(keyButtonMap[event.key]);
});

function flashButton(buttonId) {
  if (!buttonId) return;

  const button = document.getElementById(buttonId);
  if (!button || typeof button.animate !== 'function') return;

  button.animate(
    [
      { filter: 'brightness(1.4)', transform: 'scale(0.95)' },
      { filter: 'brightness(1)', transform: 'scale(1)' }
    ],
    { duration: 140, easing: 'ease-out' }
  );
}
