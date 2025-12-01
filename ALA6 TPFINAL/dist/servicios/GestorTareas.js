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
exports.GestorTareas = void 0;
const fs = __importStar(require("fs"));
const Tarea_1 = require("../modelos/Tarea");
const funcional_1 = require("../utilidades/funcional");
const RUTA_ARCHIVO = './tareas.json';
class GestorTareas {
    constructor() {
        this.listaTareas = [];
        this.cargarDesdeArchivo();
    }
    // Agregar tarea nueva
    agregarTarea(titulo, descripcion, dificultad, vencimiento) {
        const nuevaTarea = new Tarea_1.Tarea(titulo, descripcion, dificultad, vencimiento);
        this.listaTareas.push(nuevaTarea);
        this.guardarEnArchivo();
    }
    // Editar estado de una tarea
    editarEstadoTarea(indice, nuevoEstado) {
        if (this.listaTareas[indice]) {
            this.listaTareas[indice].estado = nuevoEstado;
            this.guardarEnArchivo();
        }
    }
    // Borrado Físico
    eliminarTarea(indice) {
        if (this.listaTareas[indice]) {
            this.listaTareas.splice(indice, 1);
            this.guardarEnArchivo();
        }
    }
    // Devuelve todas
    obtenerTodas() {
        return this.listaTareas;
    }
    // Devuelve ordenadas
    obtenerOrdenadas(criterio) {
        return (0, funcional_1.ordenarTareas)(this.listaTareas, criterio);
    }
    guardarEnArchivo() {
        const datos = JSON.stringify(this.listaTareas.map(t => t.toJSON()), null, 2);
        fs.writeFileSync(RUTA_ARCHIVO, datos);
    }
    cargarDesdeArchivo() {
        if (fs.existsSync(RUTA_ARCHIVO)) {
            const datosCrudos = fs.readFileSync(RUTA_ARCHIVO, 'utf-8');
            const datosParseados = JSON.parse(datosCrudos);
            this.listaTareas = datosParseados.map((d) => Tarea_1.Tarea.desdeJSON(d));
        }
    }
}
exports.GestorTareas = GestorTareas;
