let btns = document.querySelectorAll("button");
let inputElementDisplay = document.querySelector("#display");

// current and next operands
let currentOperand = "0";
let nextOperand = "";

// current operator in use
let currentOperator = "";

// text displaying in inputElementDisplay
let displayingText = "";

// current text(used for operations)
let currentText = "0";

let isOperatorPresent = false;
let isResultPresent = false;
let operationResult = "";

displayText(currentOperand);

btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // object destructuring to get the value of each button
    let {
      target: { value: btnValue },
    } = event;

    // if button value is null and not 0
    if (!btnValue && btnValue !== 0) {
      return;
    }

    switch (btnValue) {
      case "+":
      case "-":
      case "*":
      case "/":
        handleOperation(btnValue);
        break;
      case ".":
        handleDecimal();
        break;
      case "equal-to":
        performOperation(currentOperand, nextOperand, currentOperator);
        handleOperationResult(operationResult);
        return;
      case "ac":
        reset("0");
        break;
      default:
        handleNumber(btnValue);
        break;
    }

    // the above functions set the currentText, so this displays the currentText after the functions
    displayText(currentText);

    isResultPresent = false;
  });
});

function displayText(text) {
  displayingText = text;

  inputElementDisplay.value = displayingText;
}

function handleNumber(number) {
  // if currentText is "0"...
  if (currentText == "0") {
    
    // ...and 0 is pressed, return
    if (number == "0") {
      return;
    }

    //though if it isn't , remove that zero
    currentText = "";
  }

  // if there is an operator present, set nextOperand to the number pressed, else set currentOperand
  if (isOperatorPresent) {
    nextOperand += number;
  } else {
    // if the result for a previous operation is present, replace the result when a new number is pressed
    if (isResultPresent) {
      currentText = "0";
      currentOperand = "0";
    }
    currentOperand += number;
  }

  currentText += number;
}

function handleDecimal() {
  // if there is an operator present...
  if (isOperatorPresent) {
    // ...and nextOperand includes a ".", return
    if (nextOperand && nextOperand.toString().includes(".")) {
      return;
    }
    // though if it doesn't include a ".", append one to it
    nextOperand += ".";
  } else {
    // if there is no operator present...
    // ...and currentOperand includes a ".", return
    if (currentOperand && currentOperand.toString().includes(".")) {
      return;
    }
    // if it doesn't have a ".", append one to it
    currentOperand += ".";
  }

  // if the decimal button is pressed when theres nothing in currentText, put a zero, then append a "."
  if (currentText == "") {
    currentText += "0.";
  } else {
    currentText += ".";
  }
}

// handling operator buttons pressed:
function handleOperation(operator) {
  // if there is already an operator, return
  if (isOperatorPresent) {
    return;
  }

  isOperatorPresent = true;

  currentOperator = operator;
  currentText += operator;
}

// performing an operation(when "=" is pressed):
function performOperation(operand1, operand2, operator) {
  /* if there is no nextOperand to perform operation on, simply set operation result
  to the value passed as operand1(currentOperand) */
  if (!nextOperand) {
    operationResult = operand1;
    return;
  }

  switch (operator) {
    case "+":
      operationResult = parseFloat(operand1) + parseFloat(operand2);
      break;
    case "-":
      operationResult = parseFloat(operand1) - parseFloat(operand2);
      break;
    case "*":
      operationResult = parseFloat(operand1) * parseFloat(operand2);
      break;
    case "/":
      operationResult = parseFloat(operand1) / parseFloat(operand2);
      break;
  }

  operationResult = round(operationResult, 8);
}

function round(num, dp) {
  let power = "1";
  // generates power, so that dp = 1, power = 10; dp = 2, power = 100; and so on
  for (let i = 0; i < dp; i++) {
    power += "0";
  }

  // rounds by multiplying decimal by power, rounding, and dividing back to original dp
  // eg: 0.343 rounded to 2 dp(so power = 100): 0.343 multiplied by power(= 34.3), then rounds the value(= 34), then divides again(= 0.34)
  return Math.round(num * power) / power;
}

// handling operation results(when "=" is pressed):
function handleOperationResult(result) {
  displayText(result);

  // debugging purposes
  console.log(`displayed operation result: ${result}`);

  reset(result.toString());
}

// reseting(note this function doesn't reset the operationResult):
function reset(value) {
  currentOperand = value;
  currentText = value;

  nextOperand = "";

  currentOperator = "";

  isResultPresent = true;
  isOperatorPresent = false;
}
