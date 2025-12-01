import { v4 as uuidv4 } from 'uuid';

export type Estado = 'Pendiente' | 'En Curso' | 'Terminada' | 'Cancelada';
export type Dificultad = 'Fácil' | 'Medio' | 'Difícil';

export class Tarea {
    private _id: string;
    private _titulo: string;
    private _descripcion: string;
    private _estado: Estado;
    private _dificultad: Dificultad;
    private _fechaCreacion: Date;
    private _ultimaEdicion: Date;
    private _fechaVencimiento?: Date;

    constructor(titulo: string, descripcion: string = "", dificultad: Dificultad = 'Fácil', vencimiento?: Date) {
        this._id = uuidv4();
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._estado = 'Pendiente';
        this._dificultad = dificultad;
        this._fechaCreacion = new Date();
        this._ultimaEdicion = new Date();
        this._fechaVencimiento = vencimiento;
    }

    get id(): string { return this._id; }
    get titulo(): string { return this._titulo; }
    get descripcion(): string { return this._descripcion; }
    get estado(): Estado { return this._estado; }
    get dificultad(): Dificultad { return this._dificultad; }
    get fechaCreacion(): Date { return this._fechaCreacion; }
    get ultimaEdicion(): Date { return this._ultimaEdicion; }
    get fechaVencimiento(): Date | undefined { return this._fechaVencimiento; }

    set estado(nuevoEstado: Estado) {
        this._estado = nuevoEstado;
        this._ultimaEdicion = new Date();
    }

    toJSON() {
        return {
            id: this._id,
            titulo: this._titulo,
            descripcion: this._descripcion,
            estado: this._estado,
            dificultad: this._dificultad,
            fechaCreacion: this._fechaCreacion,
            ultimaEdicion: this._ultimaEdicion,
            fechaVencimiento: this._fechaVencimiento
        };
    }

    static desdeJSON(datos: any): Tarea {
        const tarea = new Tarea(datos.titulo, datos.descripcion, datos.dificultad);
        tarea._id = datos.id;
        tarea._estado = datos.estado;
        tarea._fechaCreacion = new Date(datos.fechaCreacion);
        tarea._ultimaEdicion = new Date(datos.ultimaEdicion);
        if (datos.fechaVencimiento) tarea._fechaVencimiento = new Date(datos.fechaVencimiento);
        return tarea;
    }
}