import {
    generarCartas,
    mezclarMazo,
    cargarPozo,
    repartirCartas,
    eliminarCartaMano,
    eliminarCartaPozo
} from './functions.js';

import config from './config.js';

const manoJugador = [];
const mesa = [[], [], [], []];
const reserva = [[], [], [], []];

let cartasTotales = generarCartas(config);

const mazo = mezclarMazo(cartasTotales);

const pozoJugador = cargarPozo(mazo, config);

// console.log(mazo);
// console.log(pozoJugador);
repartirCartas(manoJugador, mazo, config);
// console.log(manoJugador);

const contenedor = document.getElementById('contenedor-cartas');
const btnRepartir = document.getElementById('btn-repartir');

const contenedorPozo = document.getElementById('contenedor-pozo');


btnRepartir.addEventListener('click', () => {
    repartirCartas(manoJugador, mazo, config);
    mostrarCartas();
});


function mostrarPozo() {
    contenedorPozo.innerHTML = '';

    if (pozoJugador.length === 0) {
        document.getElementById('estado-juego').textContent = `Ganaste el juego!`;
        return;
    }

    const carta = pozoJugador[pozoJugador.length - 1];

    const divCarta = document.createElement('div');
    divCarta.classList.add('carta', 'carta-pozo');

    // divCarta.innerHTML = `
    //     <strong>${carta.valor}</strong>
    //     <span>${carta.palo}</span>
    // `;

    divCarta.innerHTML = `
    <div class="valor arriba">${carta.valor}</div>
    <div class="palo">${carta.palo}</div>
    <div class="valor abajo">${carta.valor}</div>
    `;

    divCarta.addEventListener('click', () => {
        eliminarCartaPozo(pozoJugador);
        mostrarPozo();
    });

    contenedorPozo.appendChild(divCarta);
}

function mostrarCartas() {
    contenedor.innerHTML = '';

    manoJugador.forEach((carta, index) => {
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');

        // const color = (carta.palo === '♥' || carta.palo === '♦') ? 'rojo' : 'negro';

        // divCarta.dataset.color = color;

        divCarta.innerHTML = `
        <div class="valor arriba">${carta.valor}</div>
        <div class="palo">${carta.palo}</div>
        <div class="valor abajo">${carta.valor}</div>
        `;

        divCarta.addEventListener('click', () => {
            eliminarCartaMano(manoJugador, index);
            mostrarCartas();
        });

        divCarta.dataset.index = index;

        contenedor.appendChild(divCarta);
    });
}

mostrarPozo();
mostrarCartas();



