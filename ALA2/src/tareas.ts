import { Tarea, Estado, Dificultad, EstiloDificultad, SortField } from './interfaces';

export class Tareas {
  private tareas: Tarea[] = [
    {
      titulo: "Aprender HTML",
      descripcion: "Es el primer paso en el camino a convertirme en web dev.",
      estado: Estado.Pendiente,
      creacion: new Date("2025-09-10T10:00:00").toLocaleString(),
      vencimiento: "2025-09-30",
      dificultad: Dificultad.Facil,
      ultimaEdicion: null,
    },
    {
      titulo: "Aprender JavaScript",
      descripcion: null,
      estado: Estado.EnCurso,
      creacion: new Date("2025-09-12T12:00:00").toLocaleString(),
      vencimiento: null,
      dificultad: Dificultad.Medio,
      ultimaEdicion: null,
    },
    {
      titulo: "Revisar roadmap.sh",
      descripcion: "Ver roadmap frontend",
      estado: Estado.Terminada,
      creacion: new Date("2025-09-08T15:00:00").toLocaleString(),
      vencimiento: null,
      dificultad: Dificultad.Facil,
      ultimaEdicion: null,
    },
  ];

  public getEstiloDificultad(dificultad: Dificultad): EstiloDificultad {
    const estilos: { [key in Dificultad]: EstiloDificultad } = {
      [Dificultad.Facil]: { estrellas: "★☆☆", lunas: "🌕🌑🌑" },
      [Dificultad.Medio]: { estrellas: "★★☆", lunas: "🌕🌕🌑" },
      [Dificultad.Dificil]: { estrellas: "★★★", lunas: "🌕🌕🌕" },
    };
    return estilos[dificultad] || { estrellas: "-", lunas: "-" };
  }

  public mapStatus(input: string): Estado | null {
    const mapa: { [key: string]: Estado } = {
      p: Estado.Pendiente,
      e: Estado.EnCurso,
      t: Estado.Terminada,
      c: Estado.Cancelada,
    };
    return mapa[input.toLowerCase()] || null;
  }

  public mapDifficulty(input: string): Dificultad | null {
    const mapa: { [key: string]: Dificultad } = {
      "1": Dificultad.Facil,
      "2": Dificultad.Medio,
      "3": Dificultad.Dificil,
    };
    return mapa[input] || null;
  }

  public getTasks(filtro: Estado | 'todas'): Tarea[] {
    if (filtro === 'todas') {
      return [...this.tareas];
    }
    return this.tareas.filter(t => t.estado === filtro);
  }

  public sortTasks(lista: Tarea[], campo: SortField): Tarea[] {
    if (!campo) return lista;

    return lista.sort((a, b) => {
      if (campo === 'titulo') {
        return a.titulo.localeCompare(b.titulo);
      }
      
      if (campo === 'creacion') {
        return new Date(a.creacion).getTime() - new Date(b.creacion).getTime();
      }

      if (campo === 'vencimiento') {
        if (!a.vencimiento) return 1;
        if (!b.vencimiento) return -1;
        return new Date(a.vencimiento).getTime() - new Date(b.vencimiento).getTime();
      }
      return 0;
    });
  }

  public searchTasks(clave: string): Tarea[] {
    return this.tareas.filter(t => t.titulo.toLowerCase().includes(clave.toLowerCase()));
  }

  public addTarea(nuevaTarea: Omit<Tarea, 'creacion' | 'ultimaEdicion'>): void {
    const now = new Date().toLocaleString();
    this.tareas.push({
      ...nuevaTarea,
      creacion: now,
      ultimaEdicion: now,
    });
  }
  public editarTarea(tarea: Tarea): void {
    tarea.ultimaEdicion = new Date().toLocaleString();
  }
}