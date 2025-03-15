const DIGITS = '0123456789';
const OPERATORS = '+-*/';


const buttons = document.querySelector('.buttons');
const display = document.querySelector('#display');


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }

    let result = a / b;

    result % 1 !== 0 && result.toString().split('.')[1]?.length > 4
    ? result.toFixed(4)
    : result;
}


function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);        
    }
}


let operator = null;
let operands = [];
let displayText = '';
let reset = false;


buttons.addEventListener('click', (event) => {
    const buttonText = event.target.textContent;

    if (DIGITS.includes(buttonText)) {
        if (reset) { 
            displayText = buttonText;
            reset = false;
        } else {
            displayText += buttonText;
        }
        display.textContent = displayText;
    } else if (OPERATORS.includes(buttonText)) {
        if (!operator && displayText !== '' && !OPERATORS.includes(displayText.slice(-1))) {
            operator = buttonText;
            displayText += buttonText;
            display.textContent = displayText;
            reset = false;
        }
    } else if (buttonText === '=') {
        if (operator && display.textContent.includes(operator)) {
            operands = display.textContent.split(operator);
            if (operands.length === 2 && operands[1] !== '') {
                let result = operate(parseFloat(operands[0]), parseFloat(operands[1]), operator);
                display.textContent = result;
                displayText = result.toString();
                operator = null;
                reset = true;
            }
        }
    } else if (buttonText === 'AC') {
        display.textContent = '';
        operator = null;
        operands = [];
        displayText = ''; 
        reset = false;
    }
});
