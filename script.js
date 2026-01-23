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
const slots = [[], [], [], []];

let cartasTotales = generarCartas(config);
const mazo = mezclarMazo(cartasTotales);
const pozoJugador = cargarPozo(mazo, config);

repartirCartas(manoJugador, mazo, config);

const contenedor = document.getElementById('contenedor-cartas');
const btnRepartir = document.getElementById('btn-repartir');

const contenedorPozo = document.getElementById('contenedor-pozo');

const slot0 = document.getElementById('slot0');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');

let cartaSeleccionada = null;

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

    divCarta.innerHTML = `
    <div class="valor arriba">${carta.valor}</div>
    <div class="palo">${carta.palo}</div>
    <div class="valor abajo">${carta.valor}</div>
    `;

    divCarta.addEventListener('click', () => {
        eliminarCartaPozo(pozoJugador, slots);
        mostrarPozo();
        mostrarSlot();
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


function mostrarSlot() {
    slot0.innerHTML = '';

    if (slots[0].length === 0) return;

    const cartaData = slots[0][slots[0].length - 1];

    const carta = document.createElement('div');
    carta.classList.add('carta');

    carta.innerHTML = `
        <div class="valor arriba">${cartaData.valor}</div>
        <div class="palo">${cartaData.palo}</div>
        <div class="valor abajo">${cartaData.valor}</div>
    `;


    // slot0.innerHTML = '';
    slot0.appendChild(carta);
}

// slot0.innerHTML = '';






mostrarSlot()

mostrarPozo();
mostrarCartas();



