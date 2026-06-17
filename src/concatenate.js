export function concatenateNumbers(num1, num2) {
  const firstNumber = String(num1).trim();
  const secondNumber = String(num2).trim();
  const containsOnlyDigits = /^\d+$/; // Acepta unicamente digitos ASCII del 0 al 9.

  if (containsOnlyDigits.test(firstNumber) && containsOnlyDigits.test(secondNumber)) {
    return firstNumber + secondNumber;
  }

  return 'Se deben ingresar dos numeros validos';
}
