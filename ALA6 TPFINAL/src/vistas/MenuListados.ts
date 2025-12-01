import * as readline from 'readline-sync';
import { GestorTareas } from '../servicios/GestorTareas';
import { Tarea, Estado } from '../modelos/Tarea';
import { ordenarTareas } from '../utilidades/funcional';
import { obtenerEstrellas } from '../utilidades/mapeadores';
import { verDetalle } from './MenuDetalle';

export function menuVerTareas(gestor: GestorTareas, criterioActual: any, setCriterio: (c: any) => void) {
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
        
        let filtro: Estado | 'Todas' | null = null;
        if (opcion === '1') filtro = 'Todas';
        else if (opcion === '2') filtro = 'Pendiente';
        else if (opcion === '3') filtro = 'En Curso';
        else if (opcion === '4') filtro = 'Terminada';
        else if (opcion === '0') return;

        if (filtro) {
            mostrarLista(gestor, filtro, criterioActual, setCriterio);
        }
    }
}

export function menuBuscar(gestor: GestorTareas) {
    console.clear();
    console.log("Introduce el título de una Tarea para buscarla:");
    const consulta = readline.question("> ");
    
    const todas = gestor.obtenerTodas();
    const resultados = todas.filter(t => t.titulo.toLowerCase().includes(consulta.toLowerCase()));

    if (resultados.length === 0) {
        console.log("\nNo hay tareas relacionadas con la búsqueda.");
        readline.keyInPause("Presiona cualquier tecla para continuar...");
    } else {
        mostrarLista(gestor, 'Todas', 'creacion', () => {}, resultados);
    }
}

function mostrarLista(
    gestor: GestorTareas, 
    filtro: Estado | 'Todas', 
    criterioActual: any,
    setCriterio: (c: any) => void,
    resultadosBusqueda?: Tarea[]
) {
    while (true) {
        console.clear();
        let tareasParaMostrar: Tarea[] = [];

        if (resultadosBusqueda) {
            console.log("Estas son las tareas encontradas:\n");
            tareasParaMostrar = resultadosBusqueda;
        } else {
            console.log("Estas son tus tareas.\n");
            const todas = gestor.obtenerTodas();
            if (filtro === 'Todas') tareasParaMostrar = todas;
            else tareasParaMostrar = todas.filter(t => t.estado === filtro);
        }

        tareasParaMostrar = ordenarTareas(tareasParaMostrar, criterioActual);

        if (tareasParaMostrar.length === 0) {
            console.log("(No hay tareas para mostrar)");
        } else {
            tareasParaMostrar.forEach((t, i) => {
                const estrellas = obtenerEstrellas(t.dificultad);
                console.log(`   [${i + 1}] ${t.titulo} ${estrellas}`);
            });
        }

        console.log("\nIntroduce el número para verla, [C]ambiar Orden, o 0 para volver.");
        const input = readline.question("> ");

        if (input === '0') return;

        if (input.toUpperCase() === 'C') {
            const nuevoCriterio = menuOrdenar();
            if (nuevoCriterio) setCriterio(nuevoCriterio);
            continue; 
        }

        const indice = parseInt(input) - 1;
        if (!isNaN(indice) && tareasParaMostrar[indice]) {
            verDetalle(gestor, tareasParaMostrar[indice]);
            if (resultadosBusqueda) return;
        }
    }
}

function menuOrdenar(): any {
    console.clear();
    console.log("Ordenar por:");
    console.log("[1] Título");
    console.log("[2] Vencimiento");
    console.log("[3] Fecha de Creación");
    console.log("[4] Dificultad");
    const o = readline.question("> ");
    if (o === '1') return 'titulo';
    if (o === '2') return 'vencimiento';
    if (o === '3') return 'creacion';
    if (o === '4') return 'dificultad';
    return null;
}