"use strict";

//* selecting elements

const links = document.querySelectorAll("link");
let slider = document.getElementById("slider");

const display = document.querySelector(".display");
const btnNumbers = document.querySelectorAll(".btn-number");
const btnOperators = document.querySelectorAll(".btn-operator");

const btnEqual = document.querySelector(".btn-return");
const btnReset = document.querySelector(".btn-reset");
const btnDel = document.querySelector(".btn-del");

// * variables

let currentOper = "";
let previousOper = "";
let operation = undefined;

//* helper functions

function themeChange(i) {
  if (i === "1") {
    links[2].setAttribute("href", "");
  } else {
    links[2].setAttribute("href", `css/theme${i}.css`);
  }
}

function updateDisplay() {
  display.innerHTML = currentOper.toString().slice(0, 10);
}

function addNumber(num) {
  if (num === "." && display.innerHTML.includes(".")) {
    return;
  }
  currentOper === "0"
    ? (currentOper = num)
    : (currentOper = currentOper.toString() + num.toString());
  updateDisplay();
}

function selectOperator(operator) {
  if (currentOper === "") {
    return;
  }
  if (previousOper != "") {
    calculate();
  }
  operation = operator.toString();
  previousOper = currentOper;
  currentOper = "";
}

function calculate() {
  let calculation;

  const previous = parseFloat(previousOper);
  const current = parseFloat(currentOper);

  if (isNaN(previous) || isNaN(current)) {
    return;
  } else if (operation === "+") {
    calculation = previous + current;
  } else if (operation === "-") {
    calculation = previous - current;
  } else if (operation === "x") {
    calculation = previous * current;
  } else if (operation === "/") {
    calculation = previous / current;
  } else {
    return;
  }
  calculation === Infinity
    ? (currentOper = "Error")
    : (currentOper = calculation);
  operation = undefined;
  previousOper = "";
}

function deleteNum() {
  currentOper === "Error"
    ? (currentOper = "")
    : (currentOper = currentOper.toString().slice(0, -1));
}

function reset() {
  currentOper = "";
  previousOper = "";
  operation = undefined;
}

// * event handlers

slider.addEventListener("input", () => {
  themeChange(slider.value);
});

btnNumbers.forEach((btnNumber) => {
  btnNumber.addEventListener("click", () => addNumber(btnNumber.innerHTML));
});

btnOperators.forEach((btnOperator) => {
  btnOperator.addEventListener("click", () =>
    selectOperator(btnOperator.innerHTML)
  );
});

btnReset.addEventListener("click", () => {
  reset();
  updateDisplay();
});

btnDel.addEventListener("click", () => {
  deleteNum();
  updateDisplay();
});

btnEqual.addEventListener("click", () => {
  calculate();
  updateDisplay();
});
