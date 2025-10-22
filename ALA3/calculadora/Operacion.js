class Operacion {
    sumar(num1, num2) {
        return num1 + num2;
    }
    restar(num1, num2) {
        return num1 - num2;
    }
    multip(num1, num2) {
        return num1 * num2;
    }
    dividir(num1, num2) {
        if (num2 === 0) {
            return 'No se puede dividir por 0';
        } else {
            return num1 / num2;
        }
    }
}

module.exports = Operacion;