import { concatenateNumbers } from './concatenate.js';

document.getElementById('concatButton').addEventListener('click', () => {
    const number1 = document.getElementById('number1').value;
    const number2 = document.getElementById('number2').value;

    const result = concatenateNumbers(number1, number2);
    document.getElementById('result').textContent = `Resultados: ${result}`;
});