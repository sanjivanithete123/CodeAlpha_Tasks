let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);
        display.value = result;

        addToHistory(expression, result);
    } catch {
        display.value = "Error";
    }
}

function addToHistory(expression, result) {
    let li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li); 
}

function clearHistory() {
    historyList.innerHTML = "";
}

// Keyboard support
document.addEventListener("keydown", function (event) {
    if ((event.key >= '0' && event.key <= '9') || "+-*/.".includes(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
