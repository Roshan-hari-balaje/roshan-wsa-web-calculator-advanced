const buttons = document.querySelectorAll("button");

let userInput = document.getElementById("userInput");
let displayResult = document.getElementById("displayResult");
let equal = document.querySelector(".equal");

// // for Dark Mode
let darkMode = document.querySelector(".darkMode");
let body = document.querySelector("body");
let numbers = [...document.querySelectorAll(".numbers")];
let symbols = document.querySelectorAll(".symbols");
let zero = document.querySelector(".zero");
let hr = document.querySelector("hr");

let data = "";
const percentage = "/100*";

// Display the user input
function displayValue(input) {
  displayResult.value += input;
  data = displayResult.value;
  // console.log(data);
}

// valiadate and handle error
function dataHandler(data) {
  try {
    if (data) {
      if (data.includes("√")) {
        return root(data);
      } else if (data.includes("^")) {
        return power(data);
      } else {
        let result = evaluate(
          data.replace("%", percentage).replace("x", "*").replace("÷", "/")

          // .replace("^", "**")
        );
        userInput.value = data;
        displayResult.value = result;
      }
    }
  } catch (err) {
    userInput.value = data;
    displayResult.value = "ERROR";
    console.log("Gotcha: ", err);
  }
}

// // //valiadate and handle error
// function dataHandler(data) {
//   try {
//     if (data) {
//       data = data.replace("√", () => {});

//       let result = evaluate(
//         data.replace("%", percentage).replace("x", "*").replace("÷", "/")

//         // .replace("^", "**")
//       );
//       userInput.value = data;
//       displayResult.value = result;
//     }
//   } catch (err) {
//     userInput.value = data;
//     displayResult.value = "ERROR";
//     console.log("Gotcha: ", err);
//   }
// }

// to add the input data
displayResult.addEventListener("onChange", () => {
  data = displayResult.value;
});

equal.addEventListener("click", (e) => {
  e.preventDefault();
  clearExpression();
  dataHandler(data);
});

// handle keyboad input
document.addEventListener("keydown", (e) => {
  let key = e.key;
  console.log(key, "key.....");
  const signs = ["+", "-", "x", "*", "/", "%", "^", "√", "÷", "."];
  if (key === "Enter") {
    dataHandler(data);
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "c" || key === "C" || key === "Delete") {
    clearDisplay();
  } else {
    if (!isNaN(key) || signs.includes(key)) {
      displayResult.value += key;
      data = displayResult.value;
    }
  }
});

function evaluate(data) {
  try {
    return Function("return " + ParenthesesValues(data))();
  } catch (err) {
    userInput.value = data;
    displayResult.value = "ERROR";
    console.log("Gotcha: ", err);
  }
}

function ParenthesesValues(data) {
  const regex = /\(([^)]+)\)/g;
  const replacedData = data.replace(regex, (matches) => {
    return Function("return " + matches.match(regex))();
  });
  return replacedData;
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // For Delete one value
function backspace() {
  displayResult.value = displayResult.value.substr(
    0,
    displayResult.value.length - 1
  );
  data = displayResult.value;
  console.log(data, " back");
}

// // To Clear the screen
function clearDisplay() {
  userInput.value = "";
  displayResult.value = "";
  data = displayResult.value;
}

// // For Squre Root operation
// function root(data) {
//   result = Math.sqrt(+data.replace("√", ""));
//   userInput.value = data;
//   displayResult.value = result;
//   console.log(result);
// }

// // For Advance Squre Root operation
function root(data) {
  let LHS = data.split("√")[0];
  let RHS = data.split("√")[1];

  result =
    LHS && RHS
      ? LHS * Math.sqrt(data.split("√")[1])
      : Math.sqrt(+data.replace("√", ""));

  userInput.value = LHS && RHS ? LHS + " x √" + RHS : data;

  displayResult.value = result;
  console.log(result);
}

// // For Power operation
function power(data) {
  result = Math.pow(data.split("^")[0], data.split("^")[1]);
  userInput.value = data;
  displayResult.value = result;
  console.log(result);
}

// // For reciprocal operation
function reciprocal() {
  const X = displayResult.value;
  result = 1 / X;
  userInput.value = data + " 1/x";
  displayResult.value = result;
  console.log(result);
}

// // For switch  the sign (-/+)
function switchSign() {
  result = -displayResult.value;
  userInput.value = data + " +/-";
  displayResult.value = result;
  console.log(result);
}

// // For Clear the last Expression
// function clearExpression() {
//   console.log(displayResult.value.match(/\+|\-|\*|\//g));
// }

function clearExpression() {
  let currentExpression = displayResult.value;
  let lastExpression = "";

  let regex = /\b\d+(\.\d+)?\s*$/;
  let match = currentExpression.match(regex);
  if (match) {
    lastExpression = match[0].trim();
  }

  displayResult.value = currentExpression.replace(lastExpression, "").trim();
}

// Dark Mode
darkMode.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.toggle("dark");
  numbers.forEach((e) => {
    e.classList.toggle("darkNum");
  });
  symbols.forEach((e) => {
    e.classList.toggle("darkSymbol");
  });
  zero.classList.toggle("darkNum");
  equal.classList.toggle("darkEqual");
  darkMode.classList.toggle("darkModeInDark");
  displayResult.classList.toggle("displayResultDark");
  hr.classList.toggle("hrDark");
});
