import * as readline from 'readline-sync';
import { GestorTareas } from '../servicios/GestorTareas';
import { Tarea } from '../modelos/Tarea';
import { letraAEstado, numeroADificultad, obtenerEstrellas } from '../utilidades/mapeadores';
import { inferirRelacionadas } from '../utilidades/inferencia';

export function menuAgregar(gestor: GestorTareas) {
    console.clear();
    console.log("Estas creando una nueva tarea.\n");

    const titulo = readline.question("1. Ingresa el Título: ");
    const desc = readline.question("2. Ingresa la descripción: ");
    
    let estadoLetra = readline.question("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
    let difLetra = readline.question("4. Dificultad ([1] / [2] / [3]): ");
    const vencimientoStr = readline.question("5. Vencimiento (DD/MM/YYYY) o Enter para vacio: ");
    
    let fechaVencimiento: Date | undefined = undefined;
    if (vencimientoStr.trim()) {
        const partes = vencimientoStr.split('/');
        fechaVencimiento = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
    }

    const dificultadReal = numeroADificultad(difLetra);
    const estadoReal = letraAEstado(estadoLetra);

    gestor.agregarTarea(titulo, desc, dificultadReal, fechaVencimiento);
    
    const ultimoIndice = gestor.obtenerTodas().length - 1;
    if (estadoReal !== 'Pendiente') gestor.editarEstadoTarea(ultimoIndice, estadoReal);

    console.log("\n¡Datos guardados!");
    readline.keyInPause("Presiona cualquier tecla para continuar...");
}

export function verDetalle(gestor: GestorTareas, tarea: Tarea) {
    let tareaActual = gestor.obtenerTodas().find(t => t.id === tarea.id);
    if (!tareaActual) return;

    console.clear();
    console.log("Esta es la tarea que elegiste.\n");
    console.log(tareaActual.titulo + "\n");
    console.log(tareaActual.descripcion || "(Sin descripción)");
    console.log(`\nEstado:      ${tareaActual.estado}`);
    console.log(`Dificultad:  ${obtenerEstrellas(tareaActual.dificultad)}`);
    console.log(`Vencimiento: ${tareaActual.fechaVencimiento ? tareaActual.fechaVencimiento.toISOString().split('T')[0] : 'Sin Datos'}`);
    console.log(`Creación:    ${tareaActual.fechaCreacion.toISOString().split('T')[0]}`);
    console.log(`Ult. Edición: ${tareaActual.ultimaEdicion.toISOString().split('T')[0]}`);

    console.log("\nSi deseas editarla, presiona E.");
    console.log("Si deseas borrarla, presiona B (Hard Delete).");
    console.log("O presiona 0 para volver.");
    
    const accion = readline.question("> ").toUpperCase();

    if (accion === 'E') {
        editarTarea(gestor, tareaActual);
    } else if (accion === 'B') {
        if (readline.keyInYN("¿Seguro que quieres borrarla para siempre?")) {
            const indiceReal = gestor.obtenerTodas().findIndex(t => t.id === tareaActual!.id);
            gestor.eliminarTarea(indiceReal);
            console.log("¡Tarea eliminada!");
            readline.keyInPause();
        }
    }
}

function editarTarea(gestor: GestorTareas, tarea: Tarea) {
    console.clear();
    console.log(`Estas editando la tarea ${tarea.titulo}.\n`);
    console.log("- Si deseas mantener los valores de un atributo, simplemente dejalo en blanco.");
    console.log("- Si deseas dejar en blanco un atributo, escribe un espacio.\n");

    const nuevaLetraEstado = readline.question(`2. Estado ([P]/[E]/[T]/[C]) (Actual: ${tarea.estado[0]}): `);
    
    const indiceReal = gestor.obtenerTodas().findIndex(t => t.id === tarea.id);
    
    if (nuevaLetraEstado) gestor.editarEstadoTarea(indiceReal, letraAEstado(nuevaLetraEstado));
    
    console.log("\n¡Datos guardados!");
    readline.keyInPause("Presiona cualquier tecla para continuar...");
}