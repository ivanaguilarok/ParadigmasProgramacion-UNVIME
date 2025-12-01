"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerEstrellas = exports.letraAEstado = exports.numeroADificultad = void 0;
const numeroADificultad = (input) => {
    switch (input.trim()) {
        case '1': return 'Fácil';
        case '2': return 'Medio';
        case '3': return 'Difícil';
        default: return 'Fácil';
    }
};
exports.numeroADificultad = numeroADificultad;
const letraAEstado = (input) => {
    switch (input.trim().toUpperCase()) {
        case 'P': return 'Pendiente';
        case 'E': return 'En Curso';
        case 'T': return 'Terminada';
        case 'C': return 'Cancelada';
        default: return 'Pendiente';
    }
};
exports.letraAEstado = letraAEstado;
const obtenerEstrellas = (dif) => {
    switch (dif) {
        case 'Fácil': return '★☆☆';
        case 'Medio': return '★★☆';
        case 'Difícil': return '★★★';
        default: return '';
    }
};
exports.obtenerEstrellas = obtenerEstrellas;
