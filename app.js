
const express = require('express');
const path = require('path');
const calculadora = require('./calculadora.js');
const app = express();
// Módulo usado porque el puerto automático de mi ejecución en WebStorm era muy alto y no lo permitía
const cors = require('cors');
const port = 3200;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.listen(port, () => {console.log(`Iniciado Servidor en el puerto: ${port}`)});

// Ruta POST para realizar cálculos
app.post('/operate', (req, res) => {
    const { n1, n2, operator } = req.body;
    num1 = Number(n1);
    num2 = Number(n2);
    // Selección de la operación según el operador
    let result;
    switch (operator) {
        case '+':
            result = calculadora.add(num1, num2);
            break;
        case '-':
            result = calculadora.subtract(num1, num2);
            break;
        case '*':
            result = calculadora.multiply(num1, num2);
            break;
        case '/':
            if (num2 === 0) {
                result = 'Invalid division by 0';
            } else {
                result = calculadora.divide(num1, num2);
            }
            break;
        case 'sqrt':
            result = calculadora.root(num1);
            break;
        case '^':
            result = calculadora.square(num1);
            break;
        default:
            return res.sendStatus(400);
    }
    // return res.status(200).send(result.toString());
    return res.json({result});
});
