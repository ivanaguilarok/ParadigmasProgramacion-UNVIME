const logic = require('logicjs');

// 1. Configuración Inicial
const lvar = logic.lvar;
const eq = logic.eq;
const and = logic.and;
const or = logic.or;
const run = logic.run;

console.log("=== TP PROGRAMACIÓN LÓGICA: SUPERHÉROES ===\n");

// 2. Definición de Hechos y Reglas

// REGLA 1: Aliados
function esAliado(a, b) {
    return or(
        and(eq(a, "Batman"), eq(b, "Robin")),
        and(eq(a, "Iron Man"), eq(b, "Spider-Man")),
        and(eq(a, "Wonder Woman"), eq(b, "Superman"))
    );
}

// REGLA 2: Enemigos
function esEnemigo(a, b) {
    return or(
        and(eq(a, "Batman"), eq(b, "Joker")),
        and(eq(a, "Spider-Man"), eq(b, "Green Goblin")),
        and(eq(a, "Superman"), eq(b, "Lex Luthor"))
    );
}

// REGLA 3: Mentores
function esMentor(a, b) {
    return or(
        and(eq(a, "Batman"), eq(b, "Robin")),
        and(eq(a, "Iron Man"), eq(b, "Spider-Man"))
    );
}


// 3. Consultas

// Preparamos variables lógicas reutilizables
const X = lvar("X"); // Incógnita principal
const Y = lvar("Y"); // Incógnita secundaria

console.log("--- 1. Encontrar todos los aliados de Batman ---");
// Pregunta: esAliado("Batman", X) -> Queremos saber X
const aliadosBatman = run(esAliado("Batman", X), X);
console.log(aliadosBatman);


console.log("\n--- 2. Encontrar todos los enemigos de Superman ---");
// Pregunta: esEnemigo("Superman", X) -> Queremos saber X
const enemigosSuperman = run(esEnemigo("Superman", X), X);
console.log(enemigosSuperman);


console.log("\n--- 3. ¿Quién es mentor de Spider-Man? ---");
// Pregunta: esMentor(X, "Spider-Man") -> Queremos saber X (el mentor)
const mentorSpidey = run(esMentor(X, "Spider-Man"), X);
console.log(mentorSpidey);


console.log("\n--- 4. Mostrar todos los pares Héroe-Aliado ---");
// Buscamos todos los Héroes (X) que tengan algún aliado y pedimos que nos devuelva X.
const heroes = run(esAliado(X, Y), X);

// Ahora recorremos esos héroes para mostrar sus aliados formateados

heroes.forEach(heroe => {
    // Por cada héroe encontrado, buscamos su aliado específico
    const susAliados = run(esAliado(heroe, Y), Y);
    susAliados.forEach(aliado => {
        console.log(`Héroe: ${heroe} <---> Aliado: ${aliado}`);
    });
});