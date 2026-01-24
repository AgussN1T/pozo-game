export function generarCartas(config) {
    let cartasTotales = [];

    let valores = config.valores;
    let palos = config.palos;

    /* for(let i = 0 ; i< valores.duplicados; i++){
        for (let j = 1; j < valores.length; j++) {

        for (let k = 0; k < palos.length; k++) {
            cartasTotales.push({ valor: valores[j], palo: palos[k] });
        }
    }
    } */

    for (let i = 1; i < valores.length; i++) {

        for (let j = 0; j < palos.length; j++) {
            cartasTotales.push({ valor: valores[i], palo: palos[j] });
        }
    }

    for (let i = 0; i < config.maxComodines; i++) {
        cartasTotales.push({ valor: valores[0], palo: "🃏" });

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
    while ((manoJugador.length < config.maximoMano) && mazo.length>0) {
        let carta = mazo.splice(0, 1)[0];
        manoJugador.push(carta);
        document.getElementById('contador-mazo').textContent = `${mazo.length}`;
    }

}


export function validarJugada(indexDestino, cartaSeleccionada, mesa) {

    const pila = mesa[indexDestino];

    if (cartaSeleccionada.valor === 1 && pila.length === 0) {
        return true;
    }

    if (pila.length === 0) {
        return false;
    }

    const ultimaJugada = pila[pila.length - 1];

    if (ultimaJugada.valor !== 0 && ultimaJugada.valor + 1 === cartaSeleccionada.valor) {
        return true;
    }

    if (ultimaJugada.valor === 0 && pila.length >= 2) {
        const anterior = pila[pila.length - 2];

        if (anterior.valor + 2 === cartaSeleccionada.valor) {
            return true;
        }
    }

    if (cartaSeleccionada.valor === 0) {
        const hayComodin = pila.some(carta => carta.valor === 0);
        if (!hayComodin) {
            return true;
        } else{
            console.log("hay comodin")
        }
    }

    return false;
}