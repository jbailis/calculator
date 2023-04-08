// Calculator Data Storage
class Expression {
  constructor(firstNum = 0) {
    this.firstNum = firstNum;
    this.secondNum = '';
    this.operator = '';
    this.equals = false;
  };

  get isComplete() {
    return this.equals;
  };

  get solution() {
    return operate(Number(this.firstNum), Number(this.secondNum), OPERATORS[this.operator]);
  };

  set nextInput(eventStr) {
    eventStr === "=" ? this.equals = true
    : eventStr in OPERATORS ? this.operator = eventStr
    : !this.operator ? this.firstNum += eventStr
    : this.secondNum += eventStr
  };
}

// Initialize new Expression to start
let expression = new Expression();

// Operators
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
const div = (a, b) => a / b;

const OPERATORS = {'+': add, '-': sub, '*': mult, '/': div};

// Get all necessary elements from document
const buttons = document.querySelectorAll('button');
const resultWindow = document.querySelector('.result-window');

// Operation functions
const operate = (a, b, op) => op(a, b);
const appendToDisplay = str => resultWindow.textContent += str;
const clearDisplay = () => resultWindow.textContent = '';

// Do Event Handling
function buttonEvent() {
  const eventStr = this.textContent;

  // Case: user presses clear-all button
  if (eventStr === 'X') {
    clearDisplay();
    expression = new Expression();
    return;
  };

  appendToDisplay(eventStr);

  expression.nextInput = eventStr;

  // Case: user presses equals at a valid time
  if (expression.isComplete) {
    clearDisplay();
    appendToDisplay(expression.solution);
  };
};

// Add Event Handlers
function addEventHandlers() {
  buttons.forEach(button => button.addEventListener('click', buttonEvent))};

addEventHandlers();
