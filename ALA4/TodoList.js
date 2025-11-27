import { crearTarea, aplicarEdiciones, mostrarDetallesTarea } from "./Tarea.js";
import { mapearDificultad, mapearEstado } from "./utils.js";
import RLS from "readline-sync";

export const cargarDatosIniciales = () => {
    const datos = Object.freeze([
        { id: 1, titulo: "Aprender HTML", estado: "pendiente", creacion: "2025-09-10T10:00:00", dificultad: "fácil" },
        { id: 2, titulo: "Aprender JavaScript", estado: "en curso", creacion: "2025-09-12T12:00:00", dificultad: "medio" },
        { id: 3, titulo: "Revisar roadmap.sh", estado: "terminada", creacion: "2025-09-08T15:00:00", dificultad: "fácil" },
    ]);
    const tareasIniciales = datos.map(crearTarea);
    return Object.freeze(tareasIniciales);
};

export const filtrarTareas = (tareas, filtro) => {
    return filtro === "todas" 
        ? [...tareas]
        : tareas.filter(t => t.estado === filtro);
};

export const crearFuncionOrdenamiento = (opcion) => {
    switch (opcion) {
        case "1":
            return (a, b) => a.titulo.localeCompare(b.titulo);
        case "2":
            return (a, b) => a.creacion - b.creacion;
        case "3":
            return (a, b) => {
                if (!a.vencimiento) return 1;
                if (!b.vencimiento) return -1;
                return new Date(a.vencimiento) - new Date(b.vencimiento);
            };
        default:
            return () => 0; 
    }
};

export const ordenarTareas = (lista, comparador) => {
    return lista.slice().sort(comparador);
};

export const buscarTareas = (tareas, clave) => {
    const claveNormalizada = clave.toLowerCase();
    return tareas.filter(t => t.titulo.toLowerCase().includes(claveNormalizada));
};

export const agregarTareaALista = (tareas, datosNuevaTarea) => {
    const nuevaTarea = crearTarea(datosNuevaTarea);
    return Object.freeze([...tareas, nuevaTarea]);
};

export const actualizarTareaEnLista = (tareas, tareaEditada) => {
    const nuevoArray = tareas.map(t => 
        t.id === tareaEditada.id ? tareaEditada : t
    );
    return Object.freeze(nuevoArray);
};

export const mostrarMenuPrincipal = (tareas, usuario) => {
    console.log(`\n¡Hola ${usuario}!`);
    console.log("1. Ver Mis Tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("4. Salir");

    let opcion = RLS.question("Seleccione una opción: ");
    let nuevoEstadoTareas = Object.freeze([...tareas]);

    switch (opcion) {
        case "1": 
            menuListarTareas(nuevoEstadoTareas, usuario); 
            break;
        case "2": 
            menuBuscarTarea(nuevoEstadoTareas, usuario); 
            break;
        case "3": 
            nuevoEstadoTareas = menuAgregarTarea(nuevoEstadoTareas); 
            break;
        case "4": 
            console.log(`¡Hasta luego ${usuario}!`); 
            return;
        default: 
            console.log("Opción inválida.");
    }
    mostrarMenuPrincipal(nuevoEstadoTareas, usuario);
};

const menuListarTareas = (tareas, usuario) => {
    console.log("\n--- Ver Mis Tareas ---");
    console.log("1. Todas");
    console.log("2. Pendientes");
    console.log("3. En curso");
    console.log("4. Terminadas");
    console.log("0. Volver");

    let filtroOpcion = RLS.question("Seleccione una opción: ");
    let filtro;
    switch (filtroOpcion) {
        case "1": filtro = "todas"; break;
        case "2": filtro = "pendiente"; break;
        case "3": filtro = "en curso"; break;
        case "4": filtro = "terminada"; break;
        default: return;
    }

    const tareasFiltradas = filtrarTareas(tareas, filtro);
    
    menuSeleccionarOrden(tareas, tareasFiltradas, usuario);
};

const menuSeleccionarOrden = (tareasGlobales, tareasFiltradas, usuario) => {
    console.log("\n¿Cómo quieres ordenar las tareas?");
    console.log("1. Alfabético (A-Z)");
    console.log("2. Fecha de creación");
    console.log("3. Fecha de vencimiento");
    console.log("0. Sin ordenar");

    let opcionOrden = RLS.question("Seleccione una opción: ");
    const comparador = crearFuncionOrdenamiento(opcionOrden);
    const listaOrdenada = ordenarTareas(tareasFiltradas, comparador);

    listarTareas(tareasGlobales, listaOrdenada, usuario);
};


const listarTareas = (tareasGlobales, lista, usuario) => {
    if (lista.length === 0) {
        console.log("\n📭 No hay tareas que coincidan con el filtro.\n");
        RLS.question("Presiona Enter para volver...");
        return;
    }

    console.log("\nEstas son tus tareas:");
    lista.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`)); 

    let opcion = RLS.questionInt("\n¿Ver detalles de alguna? (Número o 0 para volver): ");
    
    if (opcion > 0 && opcion <= lista.length) {
        menuDetalles(tareasGlobales, lista[opcion - 1], usuario);
    }
};

const menuDetalles = (tareasGlobales, tarea, usuario) => {
    while (true) {
        mostrarDetallesTarea(tarea);

        let opcion = RLS.question("Presiona E para editar o 0 para volver: ").toLowerCase();
        if (opcion === "0") return;

        if (opcion === "e") {
            const resultadoEdicion = menuEditarTarea(tarea);
            if (resultadoEdicion.tareaEditada) {
                const nuevasTareas = actualizarTareaEnLista(tareasGlobales, resultadoEdicion.tareaEditada);
                console.log("\n¡Datos guardados!");
                RLS.question("Presiona Enter para continuar...");
                return mostrarMenuPrincipal(nuevasTareas, usuario); 
            }
        }
    }
};

const menuEditarTarea = (tareaOriginal) => {
    console.log(`\nEstás editando la tarea: ${tareaOriginal.titulo}`);
    console.log("Si deseas mantener un valor, déjalo en blanco. Para vaciarlo, escribe un espacio.\n");

    const ediciones = {};

    let descripcionInput = RLS.question(`1. Descripción [${tareaOriginal.descripcion || "Sin datos"}]: `);
    if (descripcionInput !== "") {
        ediciones.descripcion = descripcionInput.trim() === "" ? null : descripcionInput;
    }

    let estadoInput = RLS.question(`2. Estado ([P]/[E]/[T]/[C]) [${tareaOriginal.estado}]: `);
    if (estadoInput) {
        let nuevoEstado = mapearEstado(estadoInput);
        if (nuevoEstado) ediciones.estado = nuevoEstado;
    }

    let dificultadInput = RLS.question(`3. Dificultad ([1]/[2]/[3]) [${tareaOriginal.dificultad}]: `);
    if (dificultadInput) {
        let nuevaDificultad = mapearDificultad(dificultadInput);
        if (nuevaDificultad) ediciones.dificultad = nuevaDificultad;
    }

    let vencimientoInput = RLS.question(`4. Vencimiento [${tareaOriginal.vencimiento || "Sin datos"}] (YYYY-MM-DD): `);
    if (vencimientoInput !== "") {
        ediciones.vencimiento = vencimientoInput.trim() === "" ? null : vencimientoInput;
    }

    const tareaEditada = aplicarEdiciones(tareaOriginal, ediciones); 
    
    return { tareaEditada: tareaEditada, tareaOriginal: tareaOriginal };
};


const menuBuscarTarea = (tareas, usuario) => {
    console.log("\n===== BUSCAR UNA TAREA =====");
    let clave = RLS.question("Introduce el título o palabra clave: ").toLowerCase();
    
    const resultados = buscarTareas(tareas, clave);

    if (resultados.length === 0) {
        console.log("\nNo se encontraron resultados.");
        RLS.question("Presiona Enter para continuar...");
        return;
    }

    console.log("\nResultados:");
    resultados.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));

    let opcion = RLS.questionInt("\nVer detalles (Número o 0 para volver): ");
    if (opcion > 0 && opcion <= resultados.length) {
        menuDetalles(tareas, resultados[opcion - 1], usuario);
    }
};

const menuAgregarTarea = (tareasActuales) => {
    console.log("\n===== AGREGAR UNA TAREA =====");

    let titulo = RLS.question("1. Ingresa el título: ");
    let descripcion = RLS.question("2. Ingresa la descripción: ");

    let estado;
    while (!estado) {
        estado = mapearEstado(RLS.question("3. Estado ([P]/[E]/[T]/[C]): "));
        if (!estado) console.log("Opción inválida.");
    }

    let dificultad;
    while (!dificultad) {
        dificultad = mapearDificultad(RLS.question("4. Dificultad ([1]/[2]/[3]): "));
        if (!dificultad) console.log("Opción inválida.");
    }

    let vencimiento = RLS.question("5. Fecha de vencimiento (YYYY-MM-DD) o vacío: ");
    
    const datosNuevaTarea = {
        titulo: titulo,
        descripcion: descripcion.trim() === "" ? null : descripcion,
        estado: estado,
        dificultad: dificultad,
        vencimiento: vencimiento.trim() === "" ? null : vencimiento,
    };

    const nuevasTareas = agregarTareaALista(tareasActuales, datosNuevaTarea);
    
    console.log("\n¡Datos guardados!");
    RLS.question("Presiona Enter para continuar...");

    return nuevasTareas;
};