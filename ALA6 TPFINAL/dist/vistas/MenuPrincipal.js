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
exports.iniciarAplicacion = iniciarAplicacion;
const readline = __importStar(require("readline-sync"));
const GestorTareas_1 = require("../servicios/GestorTareas");
const MenuListados_1 = require("./MenuListados");
const MenuDetalle_1 = require("./MenuDetalle");
const MenuReportes_1 = require("./MenuReportes");
function iniciarAplicacion() {
    const gestor = new GestorTareas_1.GestorTareas();
    let criterioOrdenActual = 'creacion';
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
                (0, MenuListados_1.menuVerTareas)(gestor, criterioOrdenActual, (nuevo) => criterioOrdenActual = nuevo);
                break;
            case '2':
                (0, MenuListados_1.menuBuscar)(gestor);
                break;
            case '3':
                (0, MenuDetalle_1.menuAgregar)(gestor);
                break;
            case '4':
                (0, MenuReportes_1.mostrarEstadisticas)(gestor);
                break;
            case '5':
                (0, MenuReportes_1.menuConsultasInteligentes)(gestor);
                break;
            case '0':
                ejecutando = false;
                console.log("¡Adiós!");
                break;
            default: break;
        }
    }
}
