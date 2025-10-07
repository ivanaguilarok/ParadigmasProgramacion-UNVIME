export enum Estado {
  Pendiente = "pendiente",
  EnCurso = "en curso",
  Terminada = "terminada",
  Cancelada = "cancelada",
}

export enum Dificultad {
  Facil = "fácil",
  Medio = "medio",
  Dificil = "difícil",
}

export interface Tarea {
  titulo: string;
  descripcion: string | null;
  estado: Estado;
  creacion: string;
  vencimiento: string | null;
  dificultad: Dificultad;
  ultimaEdicion: string | null;
}

export interface EstiloDificultad {
  estrellas: string;
  lunas: string;
}

export type SortField = 'titulo' | 'creacion' | 'vencimiento' | null;