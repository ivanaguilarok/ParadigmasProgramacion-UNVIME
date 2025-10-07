"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tareas = void 0;
const interfaces_1 = require("./interfaces");
class Tareas {
    constructor() {
        this.tareas = [
            {
                titulo: "Aprender HTML",
                descripcion: "Es el primer paso en el camino a convertirme en web dev.",
                estado: interfaces_1.Estado.Pendiente,
                creacion: new Date("2025-09-10T10:00:00").toLocaleString(),
                vencimiento: "2025-09-30",
                dificultad: interfaces_1.Dificultad.Facil,
                ultimaEdicion: null,
            },
            {
                titulo: "Aprender JavaScript",
                descripcion: null,
                estado: interfaces_1.Estado.EnCurso,
                creacion: new Date("2025-09-12T12:00:00").toLocaleString(),
                vencimiento: null,
                dificultad: interfaces_1.Dificultad.Medio,
                ultimaEdicion: null,
            },
            {
                titulo: "Revisar roadmap.sh",
                descripcion: "Ver roadmap frontend",
                estado: interfaces_1.Estado.Terminada,
                creacion: new Date("2025-09-08T15:00:00").toLocaleString(),
                vencimiento: null,
                dificultad: interfaces_1.Dificultad.Facil,
                ultimaEdicion: null,
            },
        ];
    }
    getEstiloDificultad(dificultad) {
        const estilos = {
            [interfaces_1.Dificultad.Facil]: { estrellas: "★☆☆", lunas: "🌕🌑🌑" },
            [interfaces_1.Dificultad.Medio]: { estrellas: "★★☆", lunas: "🌕🌕🌑" },
            [interfaces_1.Dificultad.Dificil]: { estrellas: "★★★", lunas: "🌕🌕🌕" },
        };
        return estilos[dificultad] || { estrellas: "-", lunas: "-" };
    }
    mapStatus(input) {
        const mapa = {
            p: interfaces_1.Estado.Pendiente,
            e: interfaces_1.Estado.EnCurso,
            t: interfaces_1.Estado.Terminada,
            c: interfaces_1.Estado.Cancelada,
        };
        return mapa[input.toLowerCase()] || null;
    }
    mapDifficulty(input) {
        const mapa = {
            "1": interfaces_1.Dificultad.Facil,
            "2": interfaces_1.Dificultad.Medio,
            "3": interfaces_1.Dificultad.Dificil,
        };
        return mapa[input] || null;
    }
    getTasks(filtro) {
        if (filtro === 'todas') {
            return [...this.tareas];
        }
        return this.tareas.filter(t => t.estado === filtro);
    }
    sortTasks(lista, campo) {
        if (!campo)
            return lista;
        return lista.sort((a, b) => {
            if (campo === 'titulo') {
                return a.titulo.localeCompare(b.titulo);
            }
            if (campo === 'creacion') {
                return new Date(a.creacion).getTime() - new Date(b.creacion).getTime();
            }
            if (campo === 'vencimiento') {
                if (!a.vencimiento)
                    return 1;
                if (!b.vencimiento)
                    return -1;
                return new Date(a.vencimiento).getTime() - new Date(b.vencimiento).getTime();
            }
            return 0;
        });
    }
    searchTasks(clave) {
        return this.tareas.filter(t => t.titulo.toLowerCase().includes(clave.toLowerCase()));
    }
    addTarea(nuevaTarea) {
        const now = new Date().toLocaleString();
        this.tareas.push(Object.assign(Object.assign({}, nuevaTarea), { creacion: now, ultimaEdicion: now }));
    }
    editarTarea(tarea) {
        tarea.ultimaEdicion = new Date().toLocaleString();
    }
}
exports.Tareas = Tareas;
