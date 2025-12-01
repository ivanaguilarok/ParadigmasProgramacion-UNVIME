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
exports.menuVerTareas = menuVerTareas;
exports.menuBuscar = menuBuscar;
const readline = __importStar(require("readline-sync"));
const funcional_1 = require("../utilidades/funcional");
const mapeadores_1 = require("../utilidades/mapeadores");
const MenuDetalle_1 = require("./MenuDetalle");
function menuVerTareas(gestor, criterioActual, setCriterio) {
    let subMenuActivo = true;
    while (subMenuActivo) {
        console.clear();
        console.log("¿Qué tareas deseas ver?\n");
        console.log("   [1] Todas");
        console.log("   [2] Pendientes");
        console.log("   [3] En curso");
        console.log("   [4] Terminadas");
        console.log("   [0] Volver");
        const opcion = readline.question("\n> ");
        let filtro = null;
        if (opcion === '1')
            filtro = 'Todas';
        else if (opcion === '2')
            filtro = 'Pendiente';
        else if (opcion === '3')
            filtro = 'En Curso';
        else if (opcion === '4')
            filtro = 'Terminada';
        else if (opcion === '0')
            return;
        if (filtro) {
            mostrarLista(gestor, filtro, criterioActual, setCriterio);
        }
    }
}
function menuBuscar(gestor) {
    console.clear();
    console.log("Introduce el título de una Tarea para buscarla:");
    const consulta = readline.question("> ");
    const todas = gestor.obtenerTodas();
    const resultados = todas.filter(t => t.titulo.toLowerCase().includes(consulta.toLowerCase()));
    if (resultados.length === 0) {
        console.log("\nNo hay tareas relacionadas con la búsqueda.");
        readline.keyInPause("Presiona cualquier tecla para continuar...");
    }
    else {
        mostrarLista(gestor, 'Todas', 'creacion', () => { }, resultados);
    }
}
function mostrarLista(gestor, filtro, criterioActual, setCriterio, resultadosBusqueda) {
    while (true) {
        console.clear();
        let tareasParaMostrar = [];
        if (resultadosBusqueda) {
            console.log("Estas son las tareas encontradas:\n");
            tareasParaMostrar = resultadosBusqueda;
        }
        else {
            console.log("Estas son tus tareas.\n");
            const todas = gestor.obtenerTodas();
            if (filtro === 'Todas')
                tareasParaMostrar = todas;
            else
                tareasParaMostrar = todas.filter(t => t.estado === filtro);
        }
        tareasParaMostrar = (0, funcional_1.ordenarTareas)(tareasParaMostrar, criterioActual);
        if (tareasParaMostrar.length === 0) {
            console.log("(No hay tareas para mostrar)");
        }
        else {
            tareasParaMostrar.forEach((t, i) => {
                const estrellas = (0, mapeadores_1.obtenerEstrellas)(t.dificultad);
                console.log(`   [${i + 1}] ${t.titulo} ${estrellas}`);
            });
        }
        console.log("\nIntroduce el número para verla, [C]ambiar Orden, o 0 para volver.");
        const input = readline.question("> ");
        if (input === '0')
            return;
        if (input.toUpperCase() === 'C') {
            const nuevoCriterio = menuOrdenar();
            if (nuevoCriterio)
                setCriterio(nuevoCriterio);
            continue;
        }
        const indice = parseInt(input) - 1;
        if (!isNaN(indice) && tareasParaMostrar[indice]) {
            (0, MenuDetalle_1.verDetalle)(gestor, tareasParaMostrar[indice]);
            if (resultadosBusqueda)
                return;
        }
    }
}
function menuOrdenar() {
    console.clear();
    console.log("Ordenar por:");
    console.log("[1] Título");
    console.log("[2] Vencimiento");
    console.log("[3] Fecha de Creación");
    console.log("[4] Dificultad");
    const o = readline.question("> ");
    if (o === '1')
        return 'titulo';
    if (o === '2')
        return 'vencimiento';
    if (o === '3')
        return 'creacion';
    if (o === '4')
        return 'dificultad';
    return null;
}
