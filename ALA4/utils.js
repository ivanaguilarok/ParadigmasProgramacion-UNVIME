export const mapearEstado = (input) => {
    const mapa = Object.freeze({
        p: 'pendiente',
        e: 'en curso',
        t: 'terminada',
        c: 'cancelada',
    });
    return mapa[input.toLowerCase()] || null;
}

export const mapearDificultad = (input) => {
    const mapa = Object.freeze({ 1: 'facil', 2: 'medio', 3: 'dificil' });
    return mapa[input] || null;
}