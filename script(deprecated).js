// deprecated code, im not adding comments here!

let btns = document.querySelectorAll("button");
let inputElementDisplay = document.querySelector("#display");

let displayingText = "";
let currentText = "0";

let currentOperator = "";
let currentOperand = "";
let nextOperand = "";

let isOperatorPresent = false;
let operationResult = "";

displayText(currentText);
// let currentValue = "0";
// let nextNumber = "";
// let operatore = ""
// let result = currentValue;

// let isOperatorPresent = false;

// displayValue(currentValue);

btns.forEach((button) => {
  button.addEventListener("click", (event) => {
    let {
      target: { value: btnValue },
    } = event;

    if (!btnValue && btnValue !== 0) {
      return;
    }

    if (displayingText === "0") {
      if (btnValue === "0") {
        return;
      }
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
        performOperation(currentOperator);
        handleOperationResult(operationResult);
        break;
      case "ac":
        reset("0");
        break;
      default:
        handleNumber(btnValue);
        break;
    }

    displayText(currentText);
  });
});

//     displayValue(currentValue);
//   });
// });

function displayText(text) {
  console.log(`displayed: ${text}`);
  inputElementDisplay.value = text.toString();
}

function handleOperationResult(result) {
  console.log(`displayed operation result: ${result}`);
  inputElementDisplay.value = Math.round(result * 100) / 100;

  reset(Math.round(result * 100) / 100);
  return
}

function handleNumber(number) {
  if (!operationResult && !isOperatorPresent) {
    currentText = "0";
    operationResult = currentText
  }

  if (currentText === "0") {
    currentText = "";
  }

  if (isOperatorPresent) {
    nextOperand += number;
    handleOperation(currentOperator);
  }

  currentText += number;
}

function handleDecimal() {
  if (
    currentOperand.includes(".") &&
    (nextOperand.includes(".") || nextOperand === "")
  ) {
    return;
  }

  if (isOperatorPresent) {
    nextOperand += ".";
  } else {
    currentOperand = currentText;
  }

  currentText += ".";
}

function handleOperation(operator, operand1, operand2) {
  if (!isOperatorPresent) {
    isOperatorPresent = true;

    currentOperator = operator;
    currentText += operator;
  }


  currentOperand = currentText;
}

function performOperation(operator) {
  // if (isNaN(currentText)) {
  //   throw new Error("err");
  // }
  if (!nextOperand) {
    operationResult = currentText;
    if (isOperatorPresent === true) {
      operationResult = currentOperand;
    }
    return;
  }
  switch (operator) {
    case "+":
      operationResult = parseFloat(currentOperand) + parseFloat(nextOperand);
      break;
    case "-":
      operationResult = parseFloat(currentOperand) - parseFloat(nextOperand);
      break;
    case "*":
      operationResult = parseFloat(currentOperand) * parseFloat(nextOperand);
      break;
    case "/":
      operationResult = parseFloat(currentOperand) / parseFloat(nextOperand);
      break;
  }

  console.log(operationResult);
}

function reset(value) {
  currentText = value;
  currentOperand = value;
  nextOperand = "";
  operationResult = "";

  isOperatorPresent = false;
}


