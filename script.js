const buttons = document.querySelectorAll(".btn");

const calcDisplay = document.querySelector(".calc-display");
const numberBtn = document.querySelectorAll(".number-btn");
const symbolBtn = document.querySelectorAll(".symbol-btn");
const backspaceBtn = document.querySelector(".backspace-btn");
const evaluateBtn = document.querySelector(".evaluate-btn");
const clearBtn = document.querySelector(".clear-btn");

let num1 = "";
let num2 = "";
let operator = "";

const add = function (num1, num2) {
  return Math.trunc((parseFloat(num1) + parseFloat(num2)) / 0.01) * 0.01;
};

const subtract = function (num1, num2) {
  return Math.trunc((parseFloat(num1) - parseFloat(num2)) / 0.01) * 0.01;
};

const multiply = function (num1, num2) {
  return Math.trunc((parseFloat(num1) * parseFloat(num2)) / 0.01) * 0.01;
};

const divide = function (num1, num2) {
  if (num2 === "0" || num2 === "00") {
    alert("Stop it, Bro. You will break the calculator");
    return parseFloat("");
  } else {
    return Math.trunc(parseFloat(num1) / parseFloat(num2) / 0.01) * 0.01;
  }
};

const percentage = function (num1, num2) {
  if (num2 === "0" || num2 === "00") {
    alert("Stop it, Bro. You will break the calculator");
  }
  return Math.trunc((parseFloat(num1) * parseFloat(num2)) / 100 / 0.01) * 0.01;
};

const operate = function (operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "×":
      return multiply(num1, num2);
      break;
    case "÷":
      return divide(num1, num2);
    case "%":
      return percentage(num1, num2);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.backgroundColor = "rgba(128,128,128,0.4)";
    setTimeout(() => {
      button.style.backgroundColor = "";
    }, 75); // The color reverts back after 75 ms
  });
});

symbolBtn.forEach((button) => {
  let key = button.textContent;
  button.addEventListener("click", () => {
    if (num1 === "") return;

    if (operator !== "" && num2 !== "") {
      const answer = operate(operator, num1, num2);
      num1 = answer.toString();
      num2 = "";
      calcDisplay.innerHTML = answer;
    }

    operator = key; // operator is changed to the current one
  });
});

numberBtn.forEach((button) => {
  let key = button.textContent;
  button.addEventListener("click", () => {
    if (operator === "") {
      if (num1.length > 8) return;
      if (key === "." && num1.includes(".")) return;
      num1 += key;
      calcDisplay.innerHTML = num1;
      console.log(num1);
    } else {
      if (num2.length > 8) return;
      if (key === "." && num2.includes(".")) return;
      num2 += key;
      calcDisplay.innerHTML = num2;
      console.log(num2);
    }
  });
});

backspaceBtn.addEventListener("click", () => {
  if (num1 !== "" && num2 === "") {
    num1 = num1.slice(0, -1);
    calcDisplay.innerHTML = num1;
  }
  if (num2 !== "") {
    num2 = num2.slice(0, -1);
    calcDisplay.innerHTML = num2;
  }
});

evaluateBtn.addEventListener("click", () => {
  const answer = operate(operator, num1, num2);
  calcDisplay.innerHTML = answer;
  num1 = "";
  num2 = "";
  operator = "";
});

clearBtn.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  operator = "";
  calcDisplay.innerHTML = "";
});
