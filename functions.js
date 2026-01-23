export function generarCartas(config) {
    let cartasTotales = [];

    let valores = config.valores;
    let palos = config.palos;

    for (let i = 0; i < valores.length; i++) {
        for (let j = 0; j < palos.length; j++) {
            if (i === 0) {
                cartasTotales.push({ valor: valores[i], palo: "🃏" });
            }
            else {
                cartasTotales.push({ valor: valores[i], palo: palos[j] });
            }
        }
    }
    return cartasTotales;
}

export function mezclarMazo(cartasTotales) {

    let mazo_size = cartasTotales.length;
    let mazo = [];

    for (let i = 0; i < mazo_size; i++) {

        let indexR = Math.floor(Math.random() * cartasTotales.length);
        let carta = cartasTotales.splice(indexR, 1)[0];
        mazo.push(carta);

    }
    return mazo;
}

export function cargarPozo(mazo, config) {
    let pozo = [];
    while (pozo.length < config.maximoPozo) {
        let carta = mazo.splice(0, 1)[0];
        pozo.push(carta);
    }
    return pozo;
}

export function repartirCartas(manoJugador, mazo, config) {
    while (manoJugador.length < config.maximoMano) {
        let carta = mazo.splice(0, 1)[0];
        manoJugador.push(carta);
        document.getElementById('contador-mazo').textContent = `Cartas en mazo: ${mazo.length}`;
    }

}

export function eliminarCartaMano(manoJugador, index) {
    let cartaUsada = manoJugador.splice(index, 1)[0];
    document.getElementById('contador').textContent = `Carta utilizada: ${cartaUsada.valor} de ${cartaUsada.palo}`;
}

export function eliminarCartaPozo(pozoJugador) {
    let cartaUsada = pozoJugador.splice(pozoJugador.length - 1 , 1)[0];
    document.getElementById('contadorPozo').textContent = `Carta del pozo utilizada: ${cartaUsada.valor} de ${cartaUsada.palo}`;
    document.getElementById('contadorPozoRestantes').textContent = `Cartas restantes: ${pozoJugador.length}`;
}
