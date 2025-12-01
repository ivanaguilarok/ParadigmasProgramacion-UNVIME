"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const uuid_1 = require("uuid");
class Tarea {
    constructor(titulo, descripcion = "", dificultad = 'Fácil', vencimiento) {
        this._id = (0, uuid_1.v4)();
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._estado = 'Pendiente';
        this._dificultad = dificultad;
        this._fechaCreacion = new Date();
        this._ultimaEdicion = new Date();
        this._fechaVencimiento = vencimiento;
    }
    get id() { return this._id; }
    get titulo() { return this._titulo; }
    get descripcion() { return this._descripcion; }
    get estado() { return this._estado; }
    get dificultad() { return this._dificultad; }
    get fechaCreacion() { return this._fechaCreacion; }
    get ultimaEdicion() { return this._ultimaEdicion; }
    get fechaVencimiento() { return this._fechaVencimiento; }
    set estado(nuevoEstado) {
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
    static desdeJSON(datos) {
        const tarea = new Tarea(datos.titulo, datos.descripcion, datos.dificultad);
        tarea._id = datos.id;
        tarea._estado = datos.estado;
        tarea._fechaCreacion = new Date(datos.fechaCreacion);
        tarea._ultimaEdicion = new Date(datos.ultimaEdicion);
        if (datos.fechaVencimiento)
            tarea._fechaVencimiento = new Date(datos.fechaVencimiento);
        return tarea;
    }
}
exports.Tarea = Tarea;
