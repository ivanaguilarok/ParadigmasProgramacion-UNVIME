"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAgregar = menuAgregar;
exports.verDetalle = verDetalle;
const readline = __importStar(require("readline-sync"));
const mapeadores_1 = require("../utilidades/mapeadores");
function menuAgregar(gestor) {
    console.clear();
    console.log("Estas creando una nueva tarea.\n");
    const titulo = readline.question("1. Ingresa el Título: ");
    const desc = readline.question("2. Ingresa la descripción: ");
    let estadoLetra = readline.question("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
    let difLetra = readline.question("4. Dificultad ([1] / [2] / [3]): ");
    const vencimientoStr = readline.question("5. Vencimiento (DD/MM/YYYY) o Enter para vacio: ");
    let fechaVencimiento = undefined;
    if (vencimientoStr.trim()) {
        const partes = vencimientoStr.split('/');
        fechaVencimiento = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
    }
    const dificultadReal = (0, mapeadores_1.numeroADificultad)(difLetra);
    const estadoReal = (0, mapeadores_1.letraAEstado)(estadoLetra);
    gestor.agregarTarea(titulo, desc, dificultadReal, fechaVencimiento);
    const ultimoIndice = gestor.obtenerTodas().length - 1;
    if (estadoReal !== 'Pendiente')
        gestor.editarEstadoTarea(ultimoIndice, estadoReal);
    console.log("\n¡Datos guardados!");
    readline.keyInPause("Presiona cualquier tecla para continuar...");
}
function verDetalle(gestor, tarea) {
    let tareaActual = gestor.obtenerTodas().find(t => t.id === tarea.id);
    if (!tareaActual)
        return;
    console.clear();
    console.log("Esta es la tarea que elegiste.\n");
    console.log(tareaActual.titulo + "\n");
    console.log(tareaActual.descripcion || "(Sin descripción)");
    console.log(`\nEstado:      ${tareaActual.estado}`);
    console.log(`Dificultad:  ${(0, mapeadores_1.obtenerEstrellas)(tareaActual.dificultad)}`);
    console.log(`Vencimiento: ${tareaActual.fechaVencimiento ? tareaActual.fechaVencimiento.toISOString().split('T')[0] : 'Sin Datos'}`);
    console.log(`Creación:    ${tareaActual.fechaCreacion.toISOString().split('T')[0]}`);
    console.log(`Ult. Edición: ${tareaActual.ultimaEdicion.toISOString().split('T')[0]}`);
    console.log("\nSi deseas editarla, presiona E.");
    console.log("Si deseas borrarla, presiona B (Hard Delete).");
    console.log("O presiona 0 para volver.");
    const accion = readline.question("> ").toUpperCase();
    if (accion === 'E') {
        editarTarea(gestor, tareaActual);
    }
    else if (accion === 'B') {
        if (readline.keyInYN("¿Seguro que quieres borrarla para siempre?")) {
            const indiceReal = gestor.obtenerTodas().findIndex(t => t.id === tareaActual.id);
            gestor.eliminarTarea(indiceReal);
            console.log("¡Tarea eliminada!");
            readline.keyInPause();
        }
    }
}
function editarTarea(gestor, tarea) {
    console.clear();
    console.log(`Estas editando la tarea ${tarea.titulo}.\n`);
    console.log("- Si deseas mantener los valores de un atributo, simplemente dejalo en blanco.");
    console.log("- Si deseas dejar en blanco un atributo, escribe un espacio.\n");
    const nuevaLetraEstado = readline.question(`2. Estado ([P]/[E]/[T]/[C]) (Actual: ${tarea.estado[0]}): `);
    const indiceReal = gestor.obtenerTodas().findIndex(t => t.id === tarea.id);
    if (nuevaLetraEstado)
        gestor.editarEstadoTarea(indiceReal, (0, mapeadores_1.letraAEstado)(nuevaLetraEstado));
    console.log("\n¡Datos guardados!");
    readline.keyInPause("Presiona cualquier tecla para continuar...");
}
