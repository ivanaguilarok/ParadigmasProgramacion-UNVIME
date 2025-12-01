import * as readline from 'readline-sync';
import { GestorTareas } from '../servicios/GestorTareas';
import { menuVerTareas, menuBuscar } from './MenuListados';
import { menuAgregar } from './MenuDetalle';
import { mostrarEstadisticas, menuConsultasInteligentes } from './MenuReportes';

export function iniciarAplicacion() {
    const gestor = new GestorTareas();
    let criterioOrdenActual: 'titulo' | 'vencimiento' | 'creacion' | 'dificultad' = 'creacion';

    let ejecutando = true;
    while (ejecutando) {
        console.clear();
        console.log("¡Hola Lucas!\n");
        console.log("¿Qué deseas hacer?\n");
        console.log("   [1] Ver Mis Tareas.");
        console.log("   [2] Buscar una Tarea.");
        console.log("   [3] Agregar una Tarea.");
        console.log("   [4] Estadísticas (Bonus)");
        console.log("   [5] Consultas Inteligentes (Bonus)");
        console.log("   [0] Salir.");

        const opcion = readline.question("\n> ");

        switch (opcion) {
            case '1': 
                menuVerTareas(gestor, criterioOrdenActual, (nuevo) => criterioOrdenActual = nuevo); 
                break;
            case '2': menuBuscar(gestor); break;
            case '3': menuAgregar(gestor); break;
            case '4': mostrarEstadisticas(gestor); break;
            case '5': menuConsultasInteligentes(gestor); break;
            case '0': ejecutando = false; console.log("¡Adiós!"); break;
            default: break;
        }
    }
}