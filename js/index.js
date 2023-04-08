// Calculator Data Storage
class Expression {
  constructor(firstNum = '') {
    this.firstNum = firstNum;
    this.secondNum = '';
    this.operator = '';
    this.equals = false;
  };

  get isComplete() {
    return this.firstNum && this.secondNum &&
           this.operator;
  };

  get solution() {
    if (this.isComplete) {
      return operate(Number(this.firstNum), Number(this.secondNum), OPERATORS[this.operator]);
    };
  };

  set nextInput(eventStr) {
    eventStr === "="        ? this.equals = true
    : eventStr in OPERATORS ? this.operator = eventStr
    : !this.operator        ? this.firstNum += eventStr
    :                         this.secondNum += eventStr
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

const deleteButton = () => {
  clearDisplay();
  expression = new Expression();
};

const equalsButton = () => {
  clearDisplay();
  appendToDisplay(expression.solution);
};

const checkButton = {
  'X': deleteButton,
  '=': equalsButton,
};

// Do Event Handling
function buttonEvent() {
  const eventStr = this.textContent;

  // User presses delete or equals
  if (eventStr in checkButton) {
    checkButton[eventStr]();
    return;
  };

  // Expression already has 2 numbers and an operator
  if (expression.isComplete) {
    if (eventStr in OPERATORS) {
      expression = new Expression(expression.solution);
    } else {
      expression = new Expression();
      clearDisplay();
    };
  };

  appendToDisplay(eventStr);
  expression.nextInput = eventStr;
};

// Add Event Handlers
function addEventHandlers() {
  buttons.forEach(button => button.addEventListener('click', buttonEvent))};

addEventHandlers();
