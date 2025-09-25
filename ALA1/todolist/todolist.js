const readline = require("readline-sync");

let tareas = [
  {
    titulo: "Aprender HTML",
    descripcion: "Es el primer paso en el camino a convertirme en web dev.",
    estado: "pendiente",
    creacion: new Date("2025-09-10T10:00:00").toLocaleString(),
    vencimiento: "2025-09-30",
    dificultad: "fácil",
    ultimaEdicion: null,
  },
  {
    titulo: "Aprender JavaScript",
    descripcion: null,
    estado: "en curso",
    creacion: new Date("2025-09-12T12:00:00").toLocaleString(),
    vencimiento: null,
    dificultad: "medio",
    ultimaEdicion: null,
  },
  {
    titulo: "Revisar roadmap.sh",
    descripcion: "Ver roadmap frontend",
    estado: "terminada",
    creacion: new Date("2025-09-08T15:00:00").toLocaleString(),
    vencimiento: null,
    dificultad: "fácil",
    ultimaEdicion: null,
  },
];

function mostrarDificultad(dificultad) {
  const estilos = {
    fácil: { estrellas: "★☆☆", lunas: "🌕🌑🌑" },
    medio: { estrellas: "★★☆", lunas: "🌕🌕🌑" },
    difícil: { estrellas: "★★★", lunas: "🌕🌕🌕" },
  };
  return estilos[dificultad] || { estrellas: "-", lunas: "-" };
}

function mapearEstado(input) {
  const mapa = {
    p: "pendiente",
    e: "en curso",
    t: "terminada",
    c: "cancelada",
  };
  return mapa[input.toLowerCase()] || null;
}

function mapearDificultad(input) {
  const mapa = { 1: "fácil", 2: "medio", 3: "difícil" };
  return mapa[input] || null;
}

function menuEdicion(tarea) {
  console.log(`\nEstás editando la tarea: ${tarea.titulo}`);
  console.log("Si deseas mantener un valor, déjalo en blanco. Para vaciarlo, escribe un espacio.\n");

  let descripcion = readline.question(`1. Descripción [${tarea.descripcion || "Sin datos"}]: `);
  if (descripcion.trim() !== "") tarea.descripcion = descripcion.trim() === "" ? null : descripcion;

  let estado = readline.question(`2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada) [${tarea.estado}]: `);
  if (estado) {
    let nuevoEstado = mapearEstado(estado);
    if (nuevoEstado) tarea.estado = nuevoEstado;
  }

  let dificultad = readline.question(`3. Dificultad ([1] Fácil / [2] Medio / [3] Difícil) [${tarea.dificultad}]: `);
  if (dificultad) {
    let nuevaDificultad = mapearDificultad(dificultad);
    if (nuevaDificultad) tarea.dificultad = nuevaDificultad;
  }

  let vencimiento = readline.question(`4. Vencimiento [${tarea.vencimiento || "Sin datos"}] (YYYY-MM-DD): `);
  if (vencimiento.trim() !== "") tarea.vencimiento = vencimiento.trim() === "" ? null : vencimiento;

  tarea.ultimaEdicion = new Date().toLocaleString();

  console.log("\n¡Datos guardados!");
  readline.question("Presiona Enter para continuar...");
}

function menuDetallesTarea(tarea) {
  while (true) {
    console.log("\n===== DETALLES DE LA TAREA =====");
    console.log(`Título: ${tarea.titulo}`);
    console.log(`Descripción: ${tarea.descripcion || "Sin datos"}`);
    console.log(`Estado: ${tarea.estado}`);
    console.log(`Dificultad: ${mostrarDificultad(tarea.dificultad).estrellas} (${tarea.dificultad})`);
    console.log(`Nivel: ${mostrarDificultad(tarea.dificultad).lunas}`);
    console.log(`Vencimiento: ${tarea.vencimiento || "Sin datos"}`);
    console.log(`Creación: ${tarea.creacion}`);
    console.log(`Última edición: ${tarea.ultimaEdicion || tarea.creacion}`);
    console.log("===============================\n");

    let opcion = readline.question("Presiona E para editar o 0 para volver: ").toLowerCase();
    if (opcion === "0") return;
    if (opcion === "e") menuEdicion(tarea);
  }
}

function ordenarTareas(lista) {
  console.log("\n¿Cómo quieres ordenar las tareas?");
  console.log("1. Alfabético (A-Z)");
  console.log("2. Fecha de creación");
  console.log("3. Fecha de vencimiento");
  console.log("0. Sin ordenar");

  let opcion = readline.question("Seleccione una opción: ");
  switch (opcion) {
    case "1": return lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
    case "2": return lista.sort((a, b) => new Date(a.creacion) - new Date(b.creacion));
    case "3": return lista.sort((a, b) => {
      if (!a.vencimiento) return 1;
      if (!b.vencimiento) return -1;
      return new Date(a.vencimiento) - new Date(b.vencimiento);
    });
    default: return lista;
  }
}

function listarTareas(filtro = "todas") {
  let lista = filtro === "todas" ? [...tareas] : tareas.filter(t => t.estado === filtro);

  if (lista.length === 0) {
    console.log("\n📭 No hay tareas.\n");
    return;
  }

  lista = ordenarTareas(lista);

  console.log("\nEstas son tus tareas:");
  lista.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));

  let opcion;
  do {
    opcion = readline.questionInt("\n¿Ver detalles de alguna? (Número o 0 para volver): ");
    if (opcion > 0 && opcion <= lista.length) menuDetallesTarea(lista[opcion - 1]);
  } while (opcion !== 0);
}

function menuBuscarTarea() {
  console.log("\n===== BUSCAR UNA TAREA =====");
  let clave = readline.question("Introduce el título o palabra clave: ").toLowerCase();
  let resultados = tareas.filter(t => t.titulo.toLowerCase().includes(clave));

  if (resultados.length === 0) {
    console.log("\nNo se encontraron resultados.");
    readline.question("Presiona Enter para continuar...");
    return;
  }

  console.log("\nResultados:");
  resultados.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));

  let opcion = readline.questionInt("\nVer detalles (Número o 0 para volver): ");
  if (opcion > 0 && opcion <= resultados.length) menuDetallesTarea(resultados[opcion - 1]);
}

function agregarTarea() {
  console.log("\n===== AGREGAR UNA TAREA =====");

  let titulo = readline.question("1. Ingresa el título: ");
  let descripcion = readline.question("2. Ingresa la descripción: ");

  let estado;
  while (!estado) {
    estado = mapearEstado(readline.question("3. Estado ([P]/[E]/[T]/[C]): "));
    if (!estado) console.log("Opción inválida.");
  }

  let dificultad;
  while (!dificultad) {
    dificultad = mapearDificultad(readline.question("4. Dificultad ([1] Fácil / [2] Medio / [3] Difícil): "));
    if (!dificultad) console.log("Opción inválida.");
  }

  let vencimiento = readline.question("5. Fecha de vencimiento (dd/mm/yyyy) o vacío: ");
  if (vencimiento.trim() === "") vencimiento = null;

  tareas.push({
    titulo,
    descripcion: descripcion.trim() === "" ? null : descripcion,
    estado,
    dificultad,
    vencimiento,
    creacion: new Date().toLocaleString(),
    ultimaEdicion: new Date().toLocaleString(),
  });

  console.log("\n¡Datos guardados!");
  readline.question("Presiona Enter para continuar...");
}

function main() {
  let name;

  name = readline.question("Por favor, ingresa tu nombre: ");
  while (true) {
    console.log(`\n¡Hola ${name}!`);
    console.log("1. Ver Mis Tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("4. Salir");

    let opcion = readline.question("Seleccione una opción: ");
    switch (opcion) {
      case "1":
        console.log("\n--- Ver Mis Tareas ---");
        console.log("1. Todas");
        console.log("2. Pendientes");
        console.log("3. En curso");
        console.log("4. Terminadas");
        console.log("0. Volver");

        let filtro = readline.question("Seleccione una opción: ");
        if (filtro === "1") listarTareas("todas");
        else if (filtro === "2") listarTareas("pendiente");
        else if (filtro === "3") listarTareas("en curso");
        else if (filtro === "4") listarTareas("terminada");
        break;

      case "2": menuBuscarTarea(); break;
      case "3": agregarTarea(); break;
      case "4": console.log(`¡Hasta luego ${name}!`); return;
      default: console.log("Opción inválida.");
    }
  }
}

main();