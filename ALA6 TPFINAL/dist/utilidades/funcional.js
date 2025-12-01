"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerEstadisticas = exports.ordenarTareas = exports.buscarPorTitulo = exports.filtrarPorEstado = void 0;
// --- FUNCIONES PURAS ---
const filtrarPorEstado = (tareas, estado) => {
    return tareas.filter(t => t.estado === estado);
};
exports.filtrarPorEstado = filtrarPorEstado;
const buscarPorTitulo = (tareas, consulta) => {
    return tareas.filter(t => t.titulo.toLowerCase().includes(consulta.toLowerCase()));
};
exports.buscarPorTitulo = buscarPorTitulo;
const ordenarTareas = (tareas, criterio) => {
    const copia = [...tareas];
    switch (criterio) {
        case 'titulo':
            return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
        case 'vencimiento':
            return copia.sort((a, b) => { var _a, _b; return (((_a = a.fechaVencimiento) === null || _a === void 0 ? void 0 : _a.getTime()) || 9999999999999) - (((_b = b.fechaVencimiento) === null || _b === void 0 ? void 0 : _b.getTime()) || 9999999999999); });
        case 'creacion':
            return copia.sort((a, b) => a.fechaCreacion.getTime() - b.fechaCreacion.getTime());
        case 'dificultad':
            const niveles = { 'Fácil': 1, 'Medio': 2, 'Difícil': 3 };
            return copia.sort((a, b) => niveles[a.dificultad] - niveles[b.dificultad]);
        default: return copia;
    }
};
exports.ordenarTareas = ordenarTareas;
const obtenerEstadisticas = (tareas) => {
    const total = tareas.length;
    const calcular = (funcionFiltro) => {
        return tareas.reduce((acumulador, t) => {
            const clave = funcionFiltro(t);
            if (!acumulador[clave])
                acumulador[clave] = { cantidad: 0, porcentaje: 0 };
            acumulador[clave].cantidad++;
            acumulador[clave].porcentaje = Math.round((acumulador[clave].cantidad / total) * 100);
            return acumulador;
        }, {});
    };
    return {
        total,
        porEstado: calcular(t => t.estado),
        porDificultad: calcular(t => t.dificultad)
    };
};
exports.obtenerEstadisticas = obtenerEstadisticas;
