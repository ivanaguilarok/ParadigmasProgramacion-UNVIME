import { mapearDificultad, mapearEstado } from "./utils.js";

function Tarea(datos) {
  this.titulo = datos.titulo;
  this.descripcion = datos.descripcion || null;
  this.estado = datos.estado || "pendiente";
  this.dificultad = datos.dificultad || "fácil";
  this.vencimiento = datos.vencimiento || null;
  this.creacion = datos.creacion ? new Date(datos.creacion) : new Date();
  this.ultimaEdicion = this.creacion;
}

Tarea.prototype.getDificultadVisual = function () {
    const estilos = {
        fácil: { estrellas: "★☆☆", lunas: "🌕🌑🌑" },
        medio: { estrellas: "★★☆", lunas: "🌕🌕🌑" },
        difícil: { estrellas: "★★★", lunas: "🌕🌕🌕" },
    };
    return estilos[this.dificultad] || { estrellas: "-", lunas: "-" };
};

Tarea.prototype.mostrarDetalles = function () {
  const visual = this.getDificultadVisual();
  console.log("\n===== DETALLES DE LA TAREA =====");
  console.log(`Título: ${this.titulo}`);
  console.log(`Descripción: ${this.descripcion || "Sin datos"}`);
  console.log(`Estado: ${this.estado}`);
  console.log(`Dificultad: ${visual.estrellas} (${this.dificultad})`);
  console.log(`Nivel: ${visual.lunas}`);
  console.log(`Vencimiento: ${this.vencimiento || "Sin datos"}`);
  console.log(`Creación: ${this.creacion.toLocaleString()}`);
  console.log(`Última edición: ${this.ultimaEdicion.toLocaleString()}`);
  console.log("===============================\n");
};

Tarea.prototype.editar = function (rls) {
  console.log(`\nEstás editando la tarea: ${this.titulo}`);
  console.log("Si deseas mantener un valor, déjalo en blanco. Para vaciarlo, escribe un espacio.\n");

  let descripcion = rls.question(`1. Descripción [${this.descripcion || "Sin datos"}]: `);
  if (descripcion.trim() !== "") this.descripcion = descripcion.trim() === "" ? null : descripcion;

  let estado = rls.question(`2. Estado ([P]/[E]/[T]/[C]) [${this.estado}]: `);
  if (estado) {
    let nuevoEstado = mapearEstado(estado);
    if (nuevoEstado) this.estado = nuevoEstado;
  }

  let dificultad = rls.question(`3. Dificultad ([1]/[2]/[3]) [${this.dificultad}]: `);
  if (dificultad) {
    let nuevaDificultad = mapearDificultad(dificultad);
    if (nuevaDificultad) this.dificultad = nuevaDificultad;
  }

  let vencimiento = rls.question(`4. Vencimiento [${this.vencimiento || "Sin datos"}] (YYYY-MM-DD): `);
  if (vencimiento.trim() !== "") this.vencimiento = vencimiento.trim() === "" ? null : vencimiento;

  this.ultimaEdicion = new Date();

  console.log("\n¡Datos guardados!");
  rls.question("Presiona Enter para continuar...");
};

export default Tarea;