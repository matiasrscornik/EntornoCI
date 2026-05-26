export function concatenateNumbers(num1, num2) {
    if ( num1.trim() !== '' && num2.trim() !== '' ) {
        return num1 + num2;
         // return 'a';
    } else {
        return 'Se deben ingresar dos números válidos';
    }
    
}

/*
// CommonJS export (para Node/Jest)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = concatenateNumbers;
}*/

// Export global para navegador (sin import/export)
if (typeof window !== 'undefined') {
    window.concatenateNumbers = concatenateNumbers;
}