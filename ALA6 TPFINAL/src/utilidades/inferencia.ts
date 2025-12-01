import { Tarea } from "../modelos/Tarea";

export const inferirPrioridadAlta = (tareas: Tarea[]) => {
    return tareas.filter(t => t.dificultad === 'Difícil' && t.estado === 'Pendiente');
};

export const inferirVencidas = (tareas: Tarea[]) => {
    const hoy = new Date();
    return tareas.filter(t => t.fechaVencimiento && t.fechaVencimiento < hoy && t.estado !== 'Terminada');
};

export const inferirRelacionadas = (todasLasTareas: Tarea[], tareaBase: Tarea) => {
    return todasLasTareas.filter(t =>
        t.id !== tareaBase.id && (
            t.dificultad === tareaBase.dificultad ||
            t.titulo.split(" ").some(palabra => 
                palabra.length > 3 && 
                tareaBase.titulo.toLowerCase().includes(palabra.toLowerCase())
            )
        )
    );
};