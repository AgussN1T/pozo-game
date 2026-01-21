function cargarCartas(cartas, config) {

    let cartasTotales = [];

    for (let carta of cartas) {
        for (let i = 0; i < config.duplicados; i++) {
            cartasTotales.push(carta);
        }
    }

    return cartasTotales;
}

function mezclarMazo(cartasTotales) {

    let mazo_size = cartasTotales.length;
    let mazo = [];

    for (let i = 0; i < mazo_size; i++) {

        let indexR = Math.floor(Math.random() * cartasTotales.length);
        let carta = cartasTotales.splice(indexR, 1)[0];
        mazo.push(carta);

    }
    return mazo;
}

function cargarPozo(mazo, config) {
    let pozo = [];
    while (pozo.length < config.maximoPozo) {
        let carta = mazo.splice(0, 1)[0];
        pozo.push(carta);
    }
    return pozo;
}

function repartirCartas(manoJugador, mazo, config) {

    while (manoJugador.length < config.maximoMano) {
        let carta = mazo.splice(0, 1)[0];
        manoJugador.push(carta);
    }

}

function colocarCarta(mesa, carta) {

    if (carta === 1) {
        console.log("si");
        for (let i = 0; i < mesa.length; i++) {
            if (mesa[i].length === 0) {
                //let carta = manoJugador.splice(numeroCarta,1)[0];
                mesa[i].push(carta);
            }
            break;
        }
        return true;
    }

    if (carta === 0) {
        console.log("si");
        for (let i = 0; i < mesa.length; i++) {
            if (!mazo[i].includes(carta)) {
                mesa[i].push(carta)
                //si la carta es la ultima limpiamos el array, se lleno el pozo
                if (mesa[i].length === 13) {
                    mesa[i] = []
                }
                return true;
            }
        }
    }

    for (let i = 0; i < mesa.length; i++) {
        if (mesa[i].length === carta - 1) {
            console.log("si");
            mesa[i].push(carta);
            //si la carta es la ultima limpiamos el array, se lleno el pozo
            if (mesa[i].length === 13) {
                mesa[i] = []
            }
            return true;

        }
    }

    return false;
}



module.exports = { cargarCartas, mezclarMazo, cargarPozo, repartirCartas, colocarCarta };