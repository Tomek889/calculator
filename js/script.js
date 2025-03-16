const DIGITS = '0123456789';
const OPERATORS = '+-*/';
const keyMapping = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    'Enter': '=',
    'Backspace': 'DEL',
    '.': '.',
    'c': 'AC',
};


const buttons = document.querySelector('.buttons');
const display = document.querySelector('#display');


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    let result = a * b;

    return result % 1 !== 0 && result.toString().split('.')[1]?.length > 4
    ? result.toFixed(5)
    : result;
}


function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }

    let result = a / b;

    return result % 1 !== 0 && result.toString().split('.')[1]?.length > 4
    ? result.toFixed(5)
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
        } else if (displayText.length < 13) {
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
            let index  = display.textContent.indexOf(operator);

            if (index > 0) {
                operands = display.textContent.split(operator);

                if (operands.length === 2 && operands[1] !== '') {
                    let result = operate(parseFloat(operands[0]), parseFloat(operands[1]), operator);
                    display.textContent = result;
                    displayText = result.toString();
                    operator = null;
                    reset = true;
                }
            } else {
                operands = display.textContent.slice(1).split(operator);

                if (operands.length === 2 && operands[1] !== '') {
                    let result = operate(-parseFloat(operands[0]), parseFloat(operands[1]), operator);
                    display.textContent = result;
                    displayText = result.toString();
                    operator = null;
                    reset = true;
                }  
            }
        }
    } else if (buttonText === 'AC') {
        display.textContent = '';
        operator = null;
        operands = [];
        displayText = ''; 
        reset = false;
    } else if (buttonText === '%') {
        if (display.textContent && !operator) {
            displayText = operate(parseFloat(displayText), 100, '/');
            display.textContent = displayText;
        }
    } else if (buttonText === '(-)') {
        if (display.textContent && !operator) {
            displayText = (-parseFloat(displayText)).toString();
            display.textContent = displayText;
        }
    } else if (buttonText === 'DEL') {
        if (display.textContent) {
            if (OPERATORS.includes(displayText[displayText.length - 1])) {
                operator = null;
            }

            displayText = displayText.slice(0, -1);

            if (displayText === '-') {
                displayText = displayText.slice(0, -1);
            }

            display.textContent = displayText;
        }
    } else if (buttonText === '.') {
        if (displayText) {
            if (
            displayText.includes(operator) && 
            !displayText.split(operator)[1].includes('.')) {
                displayText += '.';
                display.textContent = displayText;
                reset = false;
            } else if (!displayText.includes(operator) && !displayText.includes('.')) {
                displayText += '.';
                display.textContent = displayText;
                reset = false;
            }
        }
    }
});


document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (keyMapping[key]) {
        const button = document.querySelector(`button[data-value="${keyMapping[key]}"]`);
        if (button) {
            button.click();
        }
    }
});
