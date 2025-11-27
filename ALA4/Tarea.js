import { mapearDificultad, mapearEstado } from "./utils.js";

export const crearTarea = (datos) => {
  const now = new Date();
  const tarea = {
        id: datos.id || now.getTime(),
        titulo: datos.titulo,
        descripcion: datos.descripcion || null,
        estado: datos.estado || "pendiente",
        dificultad: datos.dificultad || "fácil",
        vencimiento: datos.vencimiento || null,
        creacion: datos.creacion ? new Date(datos.creacion) : now,
        ultimaEdicion: now,
  };
  return Object.freeze(tarea);
}

export const obtenerVisualDificultad = (tarea) => {
    const estilos = Object.freeze({
        'fácil': { estrellas: "★☆☆", lunas: "🌕🌑🌑" },
        'medio': { estrellas: "★★☆", lunas: "🌕🌕🌑" },
        'difícil': { estrellas: "★★★", lunas: "🌕🌕🌕" },
    });
    return estilos[tarea.dificultad] || { estrellas: "-", lunas: "-" };
};

export const mostrarDetallesTarea = (tarea) => {
    const visual = obtenerVisualDificultad(tarea);
    console.log("\n===== DETALLES DE LA TAREA =====");
    console.log(`Título: ${tarea.titulo}`);
    console.log(`Descripción: ${tarea.descripcion || "Sin datos"}`);
    console.log(`Estado: ${tarea.estado}`);
    console.log(`Dificultad: ${visual.estrellas} (${tarea.dificultad})`);
    console.log(`Nivel: ${visual.lunas}`);
    console.log(`Vencimiento: ${tarea.vencimiento || "Sin datos"}`);
    console.log(`Creación: ${tarea.creacion.toLocaleString()}`);
    console.log(`Última edición: ${tarea.ultimaEdicion.toLocaleString()}`);
    console.log("===============================\n");
};

const crearEditorCampo = (campo) => (tarea, nuevoValor) => {
    const nuevaTarea = {
        ...tarea,
        [campo]: nuevoValor,
        ultimaEdicion: new Date(),
    };
    return Object.freeze(nuevaTarea);
};

const editarDescripcion = crearEditorCampo('descripcion');
const editarEstado = crearEditorCampo('estado');
const editarDificultad = crearEditorCampo('dificultad');
const editarVencimiento = crearEditorCampo('vencimiento');

export const aplicarEdiciones = (tareaOriginal, ediciones) => {
    const camposValidos = ['descripcion', 'estado', 'dificultad', 'vencimiento'];

    return camposValidos.reduce((tareaAcumulada, campo) => {
        const valor = ediciones[campo];

        if (valor === undefined) {
            return tareaAcumulada;
        }
        switch (campo) {
            case 'descripcion': return editarDescripcion(tareaAcumulada, valor);
            case 'estado': return editarEstado(tareaAcumulada, valor);
            case 'dificultad': return editarDificultad(tareaAcumulada, valor);
            case 'vencimiento': return editarVencimiento(tareaAcumulada, valor);
            default: return tareaAcumulada;
        }

    }, tareaOriginal);
};