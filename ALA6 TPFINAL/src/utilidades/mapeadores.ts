import { Dificultad, Estado } from "../modelos/Tarea";

export const numeroADificultad = (input: string): Dificultad => {
    switch (input.trim()) {
        case '1': return 'Fácil';
        case '2': return 'Medio';
        case '3': return 'Difícil';
        default: return 'Fácil';
    }
};

export const letraAEstado = (input: string): Estado => {
    switch (input.trim().toUpperCase()) {
        case 'P': return 'Pendiente';
        case 'E': return 'En Curso';
        case 'T': return 'Terminada';
        case 'C': return 'Cancelada';
        default: return 'Pendiente';
    }
};

export const obtenerEstrellas = (dif: Dificultad): string => {
    switch (dif) {
        case 'Fácil': return '★☆☆';
        case 'Medio': return '★★☆';
        case 'Difícil': return '★★★';
        default: return '';
    }
};