export function concatenateNumbers(num1, num2) {
  const firstNumber = String(num1).trim();
  const secondNumber = String(num2).trim();
  const containsOnlyDigits = /^\d+$/; // Acepta unicamente digitos ASCII del 0 al 9.

  if (containsOnlyDigits.test(firstNumber) && containsOnlyDigits.test(secondNumber)) {
    return firstNumber + secondNumber;
  }

  return 'Se deben ingresar dos numeros validos';
}

// Export global para navegador (sin import/export)
if (globalThis.window !== undefined) {
  globalThis.window.concatenateNumbers = concatenateNumbers;
}
