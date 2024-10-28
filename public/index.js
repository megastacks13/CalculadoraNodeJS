let num1 = 0;
let num2 = 0;
let operator;
let previous = 0;
let current = num1;
let display;

function setOperator(op) {
    operator = op;
    num1 = current;
    current = num2;
    updateDisplay(); // Como ahora hay un operador, actualiza la pantalla para que este se muestre
}

function addToCurrent(number){
    current *= 10;
    current += number;
    updateDisplay(); // Actualiza la pantalla
}

function updateDisplay() {
    if (operator == null)
        display.value = current; // Si solo hay un número, lo muestra
    else
        display.value = num1 + operator + current; // Si hay más de un número, lo cambia
}

function clearScreen(){
    num1 = num2 = 0
    operator = null;
    current = num1;
    display.value = 0;
}

function recallPrevious(){
    current=previous; // Hace que el valor actual (bien sea n2, bien sea n2) se cambie por el guardado
    updateDisplay();
}

async function calculate() {
    num2 = current;

    // Guardar los parámetros
    const params = new URLSearchParams();
    params.append('n1', num1);
    params.append('n2', num2);
    params.append('operator', operator);

    // Realiza la solicitud al servidor con método POST
    const response = await fetch('http://localhost:3200/operate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    });

    previous = await response.text();

    // Reiniciar los valores
    clearScreen();
    display.value = previous; // Muestra el resultado

}

addEventListener("load", (event) => {});

onload = (event) => {
    display = document.getElementById('display');
};