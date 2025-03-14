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
    return a / b;
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


let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayContent = '';


buttons.addEventListener('click', (event) => {
    const buttonText = event.target.textContent;

    if (DIGITS.includes(buttonText)) {
        displayContent += buttonText;
        display.textContent = displayContent;
    } else if (OPERATORS.includes(event.target.textContent)) {
        if (!operator) {
            operator = buttonText;
            firstOperand = displayContent;
            displayContent = '';
            display.textContent = displayContent;
        }
    } else if (event.target.textContent === '=') {
        secondOperand = displayContent;
        display.textContent = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
        displayContent = display.textContent;
        operator = '';
    }
});
