"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
// cli.ts
const readline = require("readline-sync");
const interfaces_1 = require("./interfaces");
class CLI {
    constructor(service) {
        this.userName = "";
        this.service = service;
    }
    run() {
        this.userName = readline.question("Por favor, ingresa tu nombre: ");
        while (true) {
            console.log(`\n¡Hola ${this.userName}!`);
            console.log("1. Ver Mis Tareas");
            console.log("2. Buscar una tarea");
            console.log("3. Agregar una tarea");
            console.log("4. Salir");
            const opcion = readline.question("Seleccione una opción: ");
            switch (opcion) {
                case "1":
                    this.menuVerTareas();
                    break;
                case "2":
                    this.menuBuscarTarea();
                    break;
                case "3":
                    this.agregarTarea();
                    break;
                case "4":
                    console.log(`¡Hasta luego ${this.userName}!`);
                    return;
                default: console.log("Opción inválida.");
            }
        }
    }
    // --- MENUS ---
    menuVerTareas() {
        console.log("\n--- Ver Mis Tareas ---");
        console.log("1. Todas");
        console.log("2. Pendientes");
        console.log("3. En curso");
        console.log("4. Terminadas");
        console.log("0. Volver");
        const filtroOpcion = readline.question("Seleccione una opción: ");
        let filtro = 'todas';
        if (filtroOpcion === "2")
            filtro = interfaces_1.Estado.Pendiente;
        else if (filtroOpcion === "3")
            filtro = interfaces_1.Estado.EnCurso;
        else if (filtroOpcion === "4")
            filtro = interfaces_1.Estado.Terminada;
        else if (filtroOpcion === "0")
            return;
        else if (filtroOpcion !== "1") {
            console.log("Opción inválida. Volviendo al menú principal.");
            return;
        }
        this.listarTareas(filtro);
    }
    menuDetallesTarea(tarea) {
        while (true) {
            const estilos = this.service.getEstiloDificultad(tarea.dificultad);
            console.log("\n===== DETALLES DE LA TAREA =====");
            console.log(`Título: ${tarea.titulo}`);
            console.log(`Descripción: ${tarea.descripcion || "Sin datos"}`);
            console.log(`Estado: ${tarea.estado}`);
            console.log(`Dificultad: ${estilos.estrellas} (${tarea.dificultad})`);
            console.log(`Nivel: ${estilos.lunas}`);
            console.log(`Vencimiento: ${tarea.vencimiento || "Sin datos"}`);
            console.log(`Creación: ${tarea.creacion}`);
            console.log(`Última edición: ${tarea.ultimaEdicion || tarea.creacion}`);
            console.log("===============================\n");
            const opcion = readline.question("Presiona E para editar o 0 para volver: ").toLowerCase();
            if (opcion === "0")
                return;
            if (opcion === "e")
                this.menuEdicion(tarea);
        }
    }
    menuEdicion(tarea) {
        console.log(`\nEstás editando la tarea: ${tarea.titulo}`);
        console.log("Si deseas mantener un valor, déjalo en blanco. Para vaciarlo, escribe un espacio.\n");
        // 1. Descripción
        let descripcionInput = readline.question(`1. Descripción [${tarea.descripcion || "Sin datos"}]: `);
        if (descripcionInput.length > 0) {
            tarea.descripcion = descripcionInput.trim() === "" ? null : descripcionInput;
        }
        // 2. Estado
        let estadoInput = readline.question(`2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada) [${tarea.estado}]: `);
        if (estadoInput) {
            let nuevoEstado = this.service.mapStatus(estadoInput);
            if (nuevoEstado)
                tarea.estado = nuevoEstado;
        }
        // 3. Dificultad
        let dificultadInput = readline.question(`3. Dificultad ([1] Fácil / [2] Medio / [3] Difícil) [${tarea.dificultad}]: `);
        if (dificultadInput) {
            let nuevaDificultad = this.service.mapDifficulty(dificultadInput);
            if (nuevaDificultad)
                tarea.dificultad = nuevaDificultad;
        }
        // 4. Vencimiento
        let vencimientoInput = readline.question(`4. Vencimiento [${tarea.vencimiento || "Sin datos"}] (YYYY-MM-DD): `);
        if (vencimientoInput.length > 0) {
            tarea.vencimiento = vencimientoInput.trim() === "" ? null : vencimientoInput;
        }
        this.service.editarTarea(tarea);
        console.log("\n¡Datos guardados!");
        readline.question("Presiona Enter para continuar...");
    }
    menuOrdenacion() {
        console.log("\n¿Cómo quieres ordenar las tareas?");
        console.log("1. Alfabético (A-Z)");
        console.log("2. Fecha de creación");
        console.log("3. Fecha de vencimiento");
        console.log("0. Sin ordenar");
        const opcion = readline.question("Seleccione una opción: ");
        switch (opcion) {
            case "1": return 'titulo';
            case "2": return 'creacion';
            case "3": return 'vencimiento';
            default: return null;
        }
    }
    listarTareas(filtro) {
        let lista = this.service.getTasks(filtro);
        if (lista.length === 0) {
            console.log("\nNo hay tareas.\n");
            readline.question("Presiona Enter para continuar...");
            return;
        }
        const campoOrdenacion = this.menuOrdenacion();
        lista = this.service.sortTasks(lista, campoOrdenacion);
        console.log("\nEstas son tus tareas:");
        lista.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));
        let opcion;
        do {
            opcion = readline.questionInt("\n¿Ver detalles de alguna? (Número o 0 para volver): ");
            if (opcion > 0 && opcion <= lista.length) {
                this.menuDetallesTarea(lista[opcion - 1]);
            }
            else if (opcion !== 0) {
                console.log("Opción fuera de rango.");
            }
        } while (opcion !== 0);
    }
    menuBuscarTarea() {
        console.log("\n===== BUSCAR UNA TAREA =====");
        let clave = readline.question("Introduce el título o palabra clave: ");
        let resultados = this.service.searchTasks(clave);
        if (resultados.length === 0) {
            console.log("\nNo se encontraron resultados.");
            readline.question("Presiona Enter para continuar...");
            return;
        }
        console.log("\nResultados:");
        resultados.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));
        let opcion = readline.questionInt("\nVer detalles (Número o 0 para volver): ");
        if (opcion > 0 && opcion <= resultados.length) {
            this.menuDetallesTarea(resultados[opcion - 1]);
        }
    }
    agregarTarea() {
        console.log("\n===== AGREGAR UNA TAREA =====");
        let titulo = readline.question("1. Ingresa el título: ");
        let descripcionInput = readline.question("2. Ingresa la descripción: ");
        let estado = null;
        while (!estado) {
            const input = readline.question("3. Estado ([P]/[E]/[T]/[C]): ");
            estado = this.service.mapStatus(input);
            if (!estado)
                console.log("Opción inválida.");
        }
        let dificultad = null;
        while (!dificultad) {
            const input = readline.question("4. Dificultad ([1] Fácil / [2] Medio / [3] Difícil): ");
            dificultad = this.service.mapDifficulty(input);
            if (!dificultad)
                console.log("Opción inválida.");
        }
        let vencimiento = readline.question("5. Fecha de vencimiento (YYYY-MM-DD) o vacío: ");
        if (vencimiento.trim() === "")
            vencimiento = null;
        this.service.addTarea({
            titulo,
            descripcion: descripcionInput.trim() === "" ? null : descripcionInput,
            estado,
            dificultad,
            vencimiento,
        });
        console.log("\n¡Datos guardados!");
        readline.question("Presiona Enter para continuar...");
    }
}
exports.CLI = CLI;
