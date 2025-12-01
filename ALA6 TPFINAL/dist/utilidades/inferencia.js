"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferirRelacionadas = exports.inferirVencidas = exports.inferirPrioridadAlta = void 0;
const inferirPrioridadAlta = (tareas) => {
    return tareas.filter(t => t.dificultad === 'Difícil' && t.estado === 'Pendiente');
};
exports.inferirPrioridadAlta = inferirPrioridadAlta;
const inferirVencidas = (tareas) => {
    const hoy = new Date();
    return tareas.filter(t => t.fechaVencimiento && t.fechaVencimiento < hoy && t.estado !== 'Terminada');
};
exports.inferirVencidas = inferirVencidas;
const inferirRelacionadas = (todasLasTareas, tareaBase) => {
    return todasLasTareas.filter(t => t.id !== tareaBase.id && (t.dificultad === tareaBase.dificultad ||
        t.titulo.split(" ").some(palabra => palabra.length > 3 &&
            tareaBase.titulo.toLowerCase().includes(palabra.toLowerCase()))));
};
exports.inferirRelacionadas = inferirRelacionadas;
