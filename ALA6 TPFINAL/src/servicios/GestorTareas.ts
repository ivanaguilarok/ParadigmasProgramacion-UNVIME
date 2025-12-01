import * as fs from 'fs';
import { Tarea, Estado, Dificultad } from '../modelos/Tarea';
import { ordenarTareas } from '../utilidades/funcional';

const RUTA_ARCHIVO = './tareas.json';

export class GestorTareas {
    private listaTareas: Tarea[] = [];

    constructor() {
        this.cargarDesdeArchivo();
    }

    // Agregar tarea nueva
    agregarTarea(titulo: string, descripcion: string, dificultad: Dificultad, vencimiento?: Date): void {
        const nuevaTarea = new Tarea(titulo, descripcion, dificultad, vencimiento);
        this.listaTareas.push(nuevaTarea);
        this.guardarEnArchivo();
    }

    // Editar estado de una tarea
    editarEstadoTarea(indice: number, nuevoEstado: Estado): void {
        if (this.listaTareas[indice]) {
            this.listaTareas[indice].estado = nuevoEstado;
            this.guardarEnArchivo();
        }
    }

    // Borrado Físico
    eliminarTarea(indice: number): void {
        if (this.listaTareas[indice]) {
            this.listaTareas.splice(indice, 1);
            this.guardarEnArchivo();
        }
    }

    // Devuelve todas
    obtenerTodas(): Tarea[] { 
        return this.listaTareas; 
    }

    // Devuelve ordenadas
    obtenerOrdenadas(criterio: 'titulo' | 'vencimiento' | 'creacion' | 'dificultad'): Tarea[] {
        return ordenarTareas(this.listaTareas, criterio);
    }

    private guardarEnArchivo(): void {
        const datos = JSON.stringify(this.listaTareas.map(t => t.toJSON()), null, 2);
        fs.writeFileSync(RUTA_ARCHIVO, datos);
    }

    private cargarDesdeArchivo(): void {
        if (fs.existsSync(RUTA_ARCHIVO)) {
            const datosCrudos = fs.readFileSync(RUTA_ARCHIVO, 'utf-8');
            const datosParseados = JSON.parse(datosCrudos);
            this.listaTareas = datosParseados.map((d: any) => Tarea.desdeJSON(d));
        }
    }
}