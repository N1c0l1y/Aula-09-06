const currentOperandText = document.getElementById('current-operand');
const previousOperandText = document.getElementById('previous-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
    currentOperandText.innerText = currentOperand;
    if (operation != null) {
        previousOperandText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandText.innerText = '';
    }
}

function appendNumber(number) {
    // Evita colocar mais de um ponto decimal
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Se for o primeiro número, substitui o zero inicial
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Erro: Divisão por zero!");
                clearDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}
