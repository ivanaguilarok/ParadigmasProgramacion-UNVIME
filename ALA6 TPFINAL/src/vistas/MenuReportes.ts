import * as readline from 'readline-sync';
import { GestorTareas } from '../servicios/GestorTareas';
import { Tarea } from '../modelos/Tarea';
import { obtenerEstadisticas } from '../utilidades/funcional';
import { inferirPrioridadAlta, inferirVencidas, inferirRelacionadas } from '../utilidades/inferencia';

export function mostrarEstadisticas(gestor: GestorTareas) {
    console.clear();
    const stats = obtenerEstadisticas(gestor.obtenerTodas());
    console.log("--- ESTADÍSTICAS ---");
    console.log(`Total Tareas: ${stats.total}\n`);
    
    console.log("Por Estado:");
    for (const [clave, valor] of Object.entries(stats.porEstado)) {
        console.log(`- ${clave}: ${valor.cantidad} (${valor.porcentaje}%)`);
    }
    
    console.log("\nPor Dificultad:");
    for (const [clave, valor] of Object.entries(stats.porDificultad)) {
        console.log(`- ${clave}: ${valor.cantidad} (${valor.porcentaje}%)`);
    }
    readline.keyInPause("\nContinuar...");
}

export function menuConsultasInteligentes(gestor: GestorTareas) {
    console.clear();
    console.log("=== CONSULTAS INTELIGENTES (Motor Lógico) ===");
    console.log("1. Prioridad Alta (Difíciles + Pendientes)");
    console.log("2. Vencidas (Fecha pasada y no Terminada)");
    console.log("3. Buscar Relacionadas de una Tarea");
    console.log("0. Volver");
    
    const opcion = readline.question("\n> ");
    const todas = gestor.obtenerTodas();
    let resultados: Tarea[] = [];

    if (opcion === '1') {
        resultados = inferirPrioridadAlta(todas);
        console.log("\n--- PRIORIDAD ALTA ---");
        if (resultados.length === 0) console.log("(No hay tareas urgentes)");
        resultados.forEach(t => console.log(`- ${t.titulo} [${t.dificultad}]`));
    } 
    else if (opcion === '2') {
        resultados = inferirVencidas(todas);
        console.log("\n--- VENCIDAS ---");
        if (resultados.length === 0) console.log("(No hay tareas vencidas)");
        resultados.forEach(t => console.log(`- ${t.titulo} [Vence: ${t.fechaVencimiento ? t.fechaVencimiento.toISOString().split('T')[0] : 'Error'}]`));
    }
    else if (opcion === '3') {
        console.clear();
        console.log("¿De qué tarea quieres buscar relaciones?\n");
        todas.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));
        
        const idx = readline.questionInt("\nNumero de tarea: ") - 1;

        if (todas[idx]) {
            const seleccionada = todas[idx];
            resultados = inferirRelacionadas(todas, seleccionada);
            
            console.log(`\n--- RELACIONADAS CON "${seleccionada.titulo}" ---`);
            if (resultados.length === 0) console.log("(No se encontraron relaciones por palabra clave)");
            
            resultados.forEach(t => {
                console.log(`- ${t.titulo} (${t.dificultad})`);
            });
        } else {
            console.log("Índice incorrecto.");
        }
    }
    
    readline.keyInPause("\nContinuar...");
}