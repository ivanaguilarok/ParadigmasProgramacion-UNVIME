const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingrese el primer número: ", (num1) => {
    rl.question("Ingrese el operador (+, -, *, /): ", (operador) => {
        rl.question("Ingrese el segundo número: ", (num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            let resultado;

            switch (operador) {
                case "+":
                    resultado = num1 + num2;
                    break;
                case "-":
                    resultado = num1 - num2;
                    break;
                case "*":
                    resultado = num1 * num2;
                    break;
                case "/":
                    resultado = num1 / num2;
                    break;
                default:
                    resultado = "Operador no válido";
            }
            
            console.log("El resultado es: " + resultado);
            rl.close();
        });
    });
});