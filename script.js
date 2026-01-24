import {
    generarCartas,
    mezclarMazo,
    cargarPozo,
    repartirCartas,
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

const mesaElements = document.querySelectorAll('.mesa');

mesaElements.forEach((mesaElement, indexDestino) => {
    mesaElement.addEventListener('click', () => {
        if (!cartaSeleccionada) return;

        if (origenSeleccionado.tipo === 'mano') {
            manoJugador.splice(origenSeleccionado.index, 1);
            mostrarCartas();
        }

        if (origenSeleccionado.tipo === 'pozo') {
            pozoJugador.pop();
            mostrarPozo();
        }

        if (origenSeleccionado.tipo === 'slot') {
            slots[origenSeleccionado.index].pop();
            mostrarSlot(origenSeleccionado.index);
        }

        // agregar a la mesa (posición concreta)
        mesa[indexDestino].push(cartaSeleccionada);
        mostrarMesa(indexDestino);
        
        if(cartaSeleccionada.valor  === 13){
            mesaElement.innerHTML = '';
        }

        // limpiar selección
        cartaSeleccionada = null;
        origenSeleccionado = null;
    });
});


const slotElements = document.querySelectorAll('.slot');

slotElements.forEach((slotElement, indexSlot) => {
    slotElement.addEventListener('click', () => {
        if (!cartaSeleccionada) return;
        if (origenSeleccionado?.tipo !== 'mano') return;

        // mover de mano → slot
        manoJugador.splice(origenSeleccionado.index, 1);
        slots[indexSlot].push(cartaSeleccionada);

        mostrarCartas();
        mostrarSlot(indexSlot);

        cartaSeleccionada = null;
        origenSeleccionado = null;
    });
});






// const slot0 = document.getElementById('slot0');
// const slot1 = document.getElementById('slot1');
// const slot2 = document.getElementById('slot2');
// const slot3 = document.getElementById('slot3');


// slot0.addEventListener('click', () => {
//     if (!cartaSeleccionada) return;          // no hay carta         // slot ocupado

//     // mover carta a slot
//     slots[0].push(cartaSeleccionada);

//     // eliminar de la mano
//     manoJugador.splice(indiceCartaSeleccionada, 1);

//     cartaSeleccionada = null;
//     indiceCartaSeleccionada = null;

//     mostrarCartas();
//     mostrarSlot();
// });




// let cartaSeleccionada = null;
// let indiceCartaSeleccionada = null;

let cartaSeleccionada = null;
let origenSeleccionado = null;

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
        // cartaSeleccionada = carta;
        // indiceCartaSeleccionada = index;
        // eliminarCartaPozo(pozoJugador, slots);
        // mostrarPozo();
        // mostrarSlot();
        cartaSeleccionada = carta;
        origenSeleccionado = { tipo: 'pozo' };
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
            cartaSeleccionada = carta;
            origenSeleccionado = { tipo: 'mano', index };
        });

        divCarta.dataset.index = index;

        contenedor.appendChild(divCarta);
    });
}


// function mostrarSlot() {


//     slot0.innerHTML = '';

//     if (slots[0].length === 0) return;

//     const cartaData = slots[0][slots[0].length - 1];

//     const carta = document.createElement('div');
//     carta.classList.add('carta');

//     carta.innerHTML = `
//         <div class="valor arriba">${cartaData.valor}</div>
//         <div class="palo">${cartaData.palo}</div>
//         <div class="valor abajo">${cartaData.valor}</div>
//     `;
//     // slot0.innerHTML = '';
//     slot0.appendChild(carta);
// }

function mostrarSlot(index) {
    const slotElement = slotElements[index];
    slotElement.innerHTML = '';

    if (slots[index].length === 0) return;

    const cartaData = slots[index][slots[index].length - 1];

    const carta = document.createElement('div');
    carta.classList.add('carta');

    carta.innerHTML = `
        <div class="valor arriba">${cartaData.valor}</div>
        <div class="palo">${cartaData.palo}</div>
        <div class="valor abajo">${cartaData.valor}</div>
    `;
    carta.addEventListener('click', () => {
        cartaSeleccionada = cartaData;
        origenSeleccionado = { tipo: 'slot', index };
    });


    slotElement.appendChild(carta);
}

function mostrarMesa(index) {
    const mesaElement = mesaElements[index];
    mesaElement.innerHTML = '';

    if (mesa[index].length === 0) return;

    const cartaData = mesa[index][mesa[index].length - 1];

    const divCarta = document.createElement('div');
    divCarta.classList.add('carta');

    divCarta.innerHTML = `
        <div class="valor arriba">${cartaData.valor}</div>
        <div class="palo">${cartaData.palo}</div>
        <div class="valor abajo">${cartaData.valor}</div>
    `;

    mesaElement.appendChild(divCarta);
}



// mostrarSlot()

mostrarPozo();
mostrarCartas();



