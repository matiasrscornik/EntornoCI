export function concatenateNumbers(num1, num2) {
  if (num1.trim() !== '' && num2.trim() !== '') {
    return num1 + num2;
  }

  return 'Se deben ingresar dos números válidos';
}

// Export global para navegador (sin import/export)
if (typeof window !== 'undefined') {
  window.concatenateNumbers = concatenateNumbers;
}