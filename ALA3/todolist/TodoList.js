import readlineSync from "readline-sync"; 
import Tarea from "./Tarea.js";
import { mapearDificultad, mapearEstado } from "./utils.js";

function TodoList() {
  this.rls = readlineSync; 
  this.tareas = [];
  this.usuario = "";
}

TodoList.prototype.cargarDatosIniciales = function () {
  let datos = [
    { titulo: "Aprender HTML", estado: "pendiente", creacion: "2025-09-10T10:00:00", dificultad: "fácil" },
    { titulo: "Aprender JavaScript", estado: "en curso", creacion: "2025-09-12T12:00:00", dificultad: "medio" },
    { titulo: "Revisar roadmap.sh", estado: "terminada", creacion: "2025-09-08T15:00:00", dificultad: "fácil" },
  ];
  this.tareas = datos.map(dato => new Tarea(dato));
};

TodoList.prototype.iniciar = function () {
  this.usuario = this.rls.question("Por favor, ingresa tu nombre: ");
  this._mostrarMenuPrincipal(); // Llama al método interno
};

TodoList.prototype._mostrarMenuPrincipal = function () {
  while (true) {
    console.log(`\n¡Hola ${this.usuario}!`);
    console.log("1. Ver Mis Tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("4. Salir");

    let opcion = this.rls.question("Seleccione una opción: ");
    switch (opcion) {
      case "1": this._menuListarTareas(); break;
      case "2": this._buscarTarea(); break;
      case "3": this._agregarTarea(); break;
      case "4": console.log(`¡Hasta luego ${this.usuario}!`); return;
      default: console.log("Opción inválida.");
    }
  }
};

TodoList.prototype._menuListarTareas = function () {
  console.log("\n--- Ver Mis Tareas ---");
  console.log("1. Todas");
  console.log("2. Pendientes");
  console.log("3. En curso");
  console.log("4. Terminadas");
  console.log("0. Volver");

  let filtro = this.rls.question("Seleccione una opción: ");
  switch (filtro) {
    case "1": this._listarTareas("todas"); break;
    case "2": this._listarTareas("pendiente"); break;
    case "3": this._listarTareas("en curso"); break;
    case "4": this._listarTareas("terminada"); break;
    default: return;
  }
};

TodoList.prototype._ordenarTareas = function (lista) {
  console.log("\n¿Cómo quieres ordenar las tareas?");
  console.log("1. Alfabético (A-Z)");
  console.log("2. Fecha de creación");
  console.log("3. Fecha de vencimiento");
  console.log("0. Sin ordenar");

  let opcion = this.rls.question("Seleccione una opción: ");
  switch (opcion) {
    case "1": return lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
    case "2": return lista.sort((a, b) => a.creacion - b.creacion);
    case "3": return lista.sort((a, b) => {
      if (!a.vencimiento) return 1;
      if (!b.vencimiento) return -1;
      return new Date(a.vencimiento) - new Date(b.vencimiento);
    });
    default: return lista;
  }
};

TodoList.prototype._listarTareas = function (filtro = "todas") {
  let lista = filtro === "todas" ? [...this.tareas] : this.tareas.filter(t => t.estado === filtro);

  if (lista.length === 0) {
    console.log("\n📭 No hay tareas.\n");
    return;
  }

  lista = this._ordenarTareas(lista);

  console.log("\nEstas son tus tareas:");
  lista.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));

  let opcion;
  do {
    opcion = this.rls.questionInt("\n¿Ver detalles de alguna? (Número o 0 para volver): ");
    if (opcion > 0 && opcion <= lista.length) {
      this._menuDetalles(lista[opcion - 1]);
    }
  } while (opcion !== 0);
};

TodoList.prototype._menuDetalles = function (tarea) {
  while (true) {
    tarea.mostrarDetalles();

    let opcion = this.rls.question("Presiona E para editar o 0 para volver: ").toLowerCase();
    if (opcion === "0") return;
    if (opcion === "e") {
      tarea.editar(this.rls);
    }
  }
};

TodoList.prototype._buscarTarea = function () {
  console.log("\n===== BUSCAR UNA TAREA =====");
  let clave = this.rls.question("Introduce el título o palabra clave: ").toLowerCase();
  
  let resultados = this.tareas.filter(t => t.titulo.toLowerCase().includes(clave));

  if (resultados.length === 0) {
    console.log("\nNo se encontraron resultados.");
    this.rls.question("Presiona Enter para continuar...");
    return;
  }

  console.log("\nResultados:");
  resultados.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));

  let opcion = this.rls.questionInt("\nVer detalles (Número o 0 para volver): ");
  if (opcion > 0 && opcion <= resultados.length) {
    this._menuDetalles(resultados[opcion - 1]);
  }
};

TodoList.prototype._agregarTarea = function () {
  console.log("\n===== AGREGAR UNA TAREA =====");

  let titulo = this.rls.question("1. Ingresa el título: ");
  let descripcion = this.rls.question("2. Ingresa la descripción: ");

  let estado;
  while (!estado) {
    estado = mapearEstado(this.rls.question("3. Estado ([P]/[E]/[T]/[C]): "));
    if (!estado) console.log("Opción inválida.");
  }

  let dificultad;
  while (!dificultad) {
    dificultad = mapearDificultad(this.rls.question("4. Dificultad ([1]/[2]/[3]): "));
    if (!dificultad) console.log("Opción inválida.");
  }

  let vencimiento = this.rls.question("5. Fecha de vencimiento (YYYY-MM-DD) o vacío: ");
  
  const datosNuevaTarea = {
    titulo: titulo,
    descripcion: descripcion.trim() === "" ? null : descripcion,
    estado: estado,
    dificultad: dificultad,
    vencimiento: vencimiento.trim() === "" ? null : vencimiento,
  };

  this.tareas.push(new Tarea(datosNuevaTarea));

  console.log("\n¡Datos guardados!");
  this.rls.question("Presiona Enter para continuar...");
};

export default TodoList;