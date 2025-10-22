export function mapearEstado(input) {
    const mapa = {
        p: 'pendiente',
        e: 'en curso',
        t: 'terminada',
        c: 'cancelada',
    };
    return mapa[input.toLowerCase()] || null;
}

export function mapearDificultad(input) {
    const mapa = { 1: 'facil', 2: 'medio', 3: 'dificil' };
    return mapa[input] || null;
}