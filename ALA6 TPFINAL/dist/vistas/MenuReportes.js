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
exports.mostrarEstadisticas = mostrarEstadisticas;
exports.menuConsultasInteligentes = menuConsultasInteligentes;
const readline = __importStar(require("readline-sync"));
const funcional_1 = require("../utilidades/funcional");
const inferencia_1 = require("../utilidades/inferencia");
function mostrarEstadisticas(gestor) {
    console.clear();
    const stats = (0, funcional_1.obtenerEstadisticas)(gestor.obtenerTodas());
    console.log("--- ESTADÍSTICAS ---");
    console.log(`Total Tareas: ${stats.total}\n`);
    console.log("Por Estado:");
    for (const [clave, valor] of Object.entries(stats.porEstado)) {
        console.log(`- ${clave}: ${valor.cantidad} (${valor.porcentaje}%)`);
    }
    console.log("\nPor Dificultad:");
    for (const [clave, valor] of Object.entries(stats.porDificultad)) {
        console.log(`- ${clave}: ${valor.cantidad} (${valor.porcentaje}%)`);
    }
    readline.keyInPause("\nContinuar...");
}
function menuConsultasInteligentes(gestor) {
    console.clear();
    console.log("=== CONSULTAS INTELIGENTES (Motor Lógico) ===");
    console.log("1. Prioridad Alta (Difíciles + Pendientes)");
    console.log("2. Vencidas (Fecha pasada y no Terminada)");
    console.log("3. Buscar Relacionadas de una Tarea");
    console.log("0. Volver");
    const opcion = readline.question("\n> ");
    const todas = gestor.obtenerTodas();
    let resultados = [];
    if (opcion === '1') {
        resultados = (0, inferencia_1.inferirPrioridadAlta)(todas);
        console.log("\n--- PRIORIDAD ALTA ---");
        if (resultados.length === 0)
            console.log("(No hay tareas urgentes)");
        resultados.forEach(t => console.log(`- ${t.titulo} [${t.dificultad}]`));
    }
    else if (opcion === '2') {
        resultados = (0, inferencia_1.inferirVencidas)(todas);
        console.log("\n--- VENCIDAS ---");
        if (resultados.length === 0)
            console.log("(No hay tareas vencidas)");
        resultados.forEach(t => console.log(`- ${t.titulo} [Vence: ${t.fechaVencimiento ? t.fechaVencimiento.toISOString().split('T')[0] : 'Error'}]`));
    }
    else if (opcion === '3') {
        console.clear();
        console.log("¿De qué tarea quieres buscar relaciones?\n");
        todas.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));
        const idx = readline.questionInt("\nNumero de tarea: ") - 1;
        if (todas[idx]) {
            const seleccionada = todas[idx];
            resultados = (0, inferencia_1.inferirRelacionadas)(todas, seleccionada);
            console.log(`\n--- RELACIONADAS CON "${seleccionada.titulo}" ---`);
            if (resultados.length === 0)
                console.log("(No se encontraron relaciones por palabra clave)");
            resultados.forEach(t => {
                console.log(`- ${t.titulo} (${t.dificultad})`);
            });
        }
        else {
            console.log("Índice incorrecto.");
        }
    }
    readline.keyInPause("\nContinuar...");
}
