const readline = require("readline");
const Operacion = require("./Operacion.js");

const cl = new Operacion();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mostrarMenu() {
    rl.question("Ingrese el primer número: ", (num1) => {
        rl.question("Ingrese el operador (+, -, *, /): ", (operador) => {
            rl.question("Ingrese el segundo número: ", (num2) => {
                num1 = parseFloat(num1);
                num2 = parseFloat(num2);
                let resultado;

                switch (operador) {
                    case "+":
                        resultado = cl.sumar(num1, num2);
                        break;
                    case "-":
                        resultado = cl.restar(num1, num2);
                        break;
                    case "*":
                        resultado = cl.multiplicar(num1, num2);
                        break;
                    case "/":
                        resultado = cl.dividir(num1, num2);
                        break;
                    default:
                        resultado = "Operador no válido";
                }
                
                console.log("El resultado es: " + resultado);
                
                mostrarMenu(); 
            });
        });
    });
}

mostrarMenu();
