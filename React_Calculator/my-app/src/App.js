import "./App.css";
import { useState, useEffect } from "react";

function App() 
  const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;

  const inputValue = parseFloat(displayValue);
  console.log(`HERE ${inputValue}`);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    console.log(`inside computations`);
    const result = calculate(firstOperand, inputValue, operator);
    console.log(`result is ${result}`);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
      break;
    case "-":
      return firstOperand - secondOperand;
      break;
    case "*":
      return firstOperand * secondOperand;
      break;
    case "/":
      return firstOperand / secondOperand;
      break;

    default:
      console.log("incorrect operator !!");
      break;
  }
  return secondOperand;
}

function updateDisplay() {
  console.log(`INSIDE UPDATE DISPLAY ()`);
  console.log(`current display value is ${calculator.displayValue}`);

  const display = document.querySelector(".calculatorScreen");
  display.value = calculator.displayValue;
}

const keys = document.querySelector(".calculatorKeys");

keys.addEventListener("click", (e) => {
  const { target } = e;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
  return (
    <div className="App">
      <div className="calculator">
        <div className="calculatorScreen"></div>
        <div class="calculatorKeys">
          <button type="button" class="operator" value="+">
            +
          </button>
          <button type="button" class="operator" value="-">
            -
          </button>
          <button type="button" class="operator" value="*">
            &times;
          </button>
          <button type="button" class="operator" value="/">
            &divide;
          </button>

          <button type="button" value="7">
            7
          </button>
          <button type="button" value="8">
            8
          </button>
          <button type="button" value="9">
            9
          </button>

          <button type="button" value="4">
            4
          </button>
          <button type="button" value="5">
            5
          </button>
          <button type="button" value="6">
            6
          </button>

          <button type="button" value="1">
            1
          </button>
          <button type="button" value="2">
            2
          </button>
          <button type="button" value="3">
            3
          </button>

          <button type="button" value="0">
            0
          </button>

          <button type="button" class="decimal" value=".">
            .
          </button>
          <button type="button" class="all-clear" value="all-clear">
            C
          </button>
          <button type="button" class="operator" id="equal-sign" value="=">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
