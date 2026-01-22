// const { generarCartas } = require('./functions.js')
// const { mezclarMazo } = require('./functions.js')
// const { cargarPozo } = require('./functions.js')
// const { repartirCartas } = require('./functions.js')

import {
    generarCartas,
    mezclarMazo,
    cargarPozo,
    repartirCartas
} from './functions.js';

import config from './config.js';

const manoJugador = [];

const mesa = [[], [], [], []];
const slotsJugador = [[], [], [], []];

let cartasTotales = generarCartas(config);

const mazo = mezclarMazo(cartasTotales);

const pozoJugador = cargarPozo(mazo, config);

// console.log(mazo);
console.log(pozoJugador);
repartirCartas(manoJugador, mazo, config);
console.log(manoJugador);


const contenedor = document.getElementById('contenedor-cartas');

function mostrarCartas() {
    manoJugador.forEach((carta) => {
        const divCarta = document.createElement('div');
        
        divCarta.classList.add('carta');
        
        divCarta.innerHTML = `
            <strong>${carta.valor}</strong>
            <span>${carta.palo}</span>
        `;
        
        contenedor.appendChild(divCarta);
    });
}

mostrarCartas();



