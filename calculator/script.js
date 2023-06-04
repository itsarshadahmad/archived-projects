// Number buttons (0-9)
const numberButtons = document.querySelectorAll('.button-number');
// Operator Buttons(+,-,*,/)
const operationButtons = document.querySelectorAll('.button-operator');
// Equal Button (=)
const equalsButton = document.querySelector('#box-equal');
// Delete Button (DEL)
const deleteButton = document.querySelector('.button-delete');
// Clear All (AC)
const allClearButton = document.querySelector('#box-all-clear');
// Previous Operation Display
const previousOperandTextElement = document.querySelector('#previous-display');
// Current Display
const currentOperandTextElement = document.querySelector('#current-display');

let previousNumberOnDisplay = "";
let numberOnDisplay = "";
let operationKey = "";

// Enter Numbers on Current Screen
numberButtons.forEach(events => {
    events.addEventListener('click', () => {
        numberOnDisplay += events.textContent;
        updateCurrentScreen(numberOnDisplay);
    });
});

// Update Current Screen
function updateCurrentScreen(numberOnDisplay) {
    currentOperandTextElement.innerHTML = numberOnDisplay;
}

// Update Previous Screen
function updatePreviousScreen(previousNumberOnDisplay) {
    previousOperandTextElement.innerHTML = previousNumberOnDisplay;
}

// Clear All
allClearButton.addEventListener('click', () => {
    numberOnDisplay = "";
    operationKey = "";
    previousNumberOnDisplay = "";
    updatePreviousScreen(previousNumberOnDisplay);
    updateCurrentScreen(numberOnDisplay);
});

// Delete Current Operation
deleteButton.addEventListener('click', () => {
    if (numberOnDisplay.length > 0) {
        numberOnDisplay = numberOnDisplay.slice(0, -1);
        updateCurrentScreen(numberOnDisplay);
    }
});

// Operation Button
operationButtons.forEach(event => {
    event.addEventListener('click', () => {
        operationKey = event.textContent;
        previousNumberOnDisplay = numberOnDisplay + " " + operationKey;
        updatePreviousScreen(previousNumberOnDisplay);
        numberOnDisplay = "";
        updateCurrentScreen(numberOnDisplay);
    });
});

// Calculation
equalsButton.addEventListener('click', () => {
    if (previousOperandTextElement.innerHTML !== "" && currentOperandTextElement.innerHTML !== "") {
        let previous = Number.parseFloat(previousOperandTextElement.innerHTML.slice(0, -1));
        let current = Number.parseFloat(currentOperandTextElement.innerHTML);
        switch (operationKey) {
            case '+':
                numberOnDisplay = previous + current;
                afterEquals(numberOnDisplay)
                break;
            case '-':
                numberOnDisplay = previous - current;
                afterEquals(numberOnDisplay)
                break;
            case '÷':
                numberOnDisplay = previous / current;
                afterEquals(numberOnDisplay)
                break;
            case 'x':
                numberOnDisplay = previous * current;
                afterEquals(numberOnDisplay)
                break;
            default:
                alert("something went wrong!")
                break;
        }
    } else if (currentOperandTextElement.innerHTML !== "") {
        updateCurrentScreen(currentOperandTextElement.innerHTML);
        operationKey = "";
        previousNumberOnDisplay = "";
        updatePreviousScreen(previousNumberOnDisplay);
    }
});

function afterEquals(numberOnDisplay) {
    operationKey = "";
    previousNumberOnDisplay = "";
    updatePreviousScreen("");
    updateCurrentScreen("= "+numberOnDisplay);
}