import { Tarea, Estado } from "../modelos/Tarea";

// --- FUNCIONES PURAS ---

export const filtrarPorEstado = (tareas: Tarea[], estado: Estado): Tarea[] => {
    return tareas.filter(t => t.estado === estado);
};

export const buscarPorTitulo = (tareas: Tarea[], consulta: string): Tarea[] => {
    return tareas.filter(t => t.titulo.toLowerCase().includes(consulta.toLowerCase()));
};

export const ordenarTareas = (tareas: Tarea[], criterio: 'titulo' | 'vencimiento' | 'creacion' | 'dificultad'): Tarea[] => {
    const copia = [...tareas];
    switch (criterio) {
        case 'titulo': 
            return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
        case 'vencimiento':
            return copia.sort((a, b) => (a.fechaVencimiento?.getTime() || 9999999999999) - (b.fechaVencimiento?.getTime() || 9999999999999));
        case 'creacion': 
            return copia.sort((a, b) => a.fechaCreacion.getTime() - b.fechaCreacion.getTime());
        case 'dificultad':
            const niveles = { 'Fácil': 1, 'Medio': 2, 'Difícil': 3 };
            return copia.sort((a, b) => niveles[a.dificultad] - niveles[b.dificultad]);
        default: return copia;
    }
};

export const obtenerEstadisticas = (tareas: Tarea[]) => {
    const total = tareas.length;
    
    const calcular = (funcionFiltro: (t: Tarea) => string) => {
        return tareas.reduce((acumulador, t) => {
            const clave = funcionFiltro(t);
            if (!acumulador[clave]) acumulador[clave] = { cantidad: 0, porcentaje: 0 };
            
            acumulador[clave].cantidad++;
            acumulador[clave].porcentaje = Math.round((acumulador[clave].cantidad / total) * 100);
            
            return acumulador;
        }, {} as Record<string, { cantidad: number, porcentaje: number }>);
    };

    return { 
        total, 
        porEstado: calcular(t => t.estado),
        porDificultad: calcular(t => t.dificultad)
    };
};