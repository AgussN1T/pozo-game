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

        if(!validarJugada(indexDestino)) {
            cartaSeleccionada = null;
            origenSeleccionado = null;
            return;
        }

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


        mesa[indexDestino].push(cartaSeleccionada);
        mostrarMesa(indexDestino);

        if (cartaSeleccionada.valor === 13) {
            mesaElement.innerHTML = '';
            mesa[indexDestino] = [];
        }

        console.log(mesa);

        cartaSeleccionada = null;
        origenSeleccionado = null;
    });
});


const slotElements = document.querySelectorAll('.slot');

slotElements.forEach((slotElement, indexSlot) => {
    slotElement.addEventListener('click', () => {
        if (!cartaSeleccionada) return;
        if (origenSeleccionado?.tipo !== 'mano') return;

        
        manoJugador.splice(origenSeleccionado.index, 1);
        slots[indexSlot].push(cartaSeleccionada);

        mostrarCartas();
        mostrarSlot(indexSlot);

        cartaSeleccionada = null;
        origenSeleccionado = null;
    });
});

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
    carta.addEventListener('click', (e) => {
        if (cartaSeleccionada) return;
        e.stopPropagation();
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


// function validarJugada(indexDestino) {

//     if((cartaSeleccionada.valor === 1) && (mesa[indexDestino].length) === 0){
//         return true;
//     }

//     let ultimaJugada = mesa[indexDestino][mesa[indexDestino].length - 1];

//     if (ultimaJugada.valor + 1 === cartaSeleccionada.valor) {
//         return true;
//     }

//     if(ultimaJugada.valor === 0){
//         if((mesa[indexDestino][mesa[indexDestino].length - 2]) + 2 === cartaSeleccionada.valor){
//             return true;
//         }
//     }
//     if(cartaSeleccionada.valor === 0){
//         if(!(mesa[indexDestino].some(carta => carta.valor === 0))){
//             return true;
//         }
//     }

//     return false;

// }

function validarJugada(indexDestino) {

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
        }
    }

    return false;
}






mostrarPozo();
mostrarCartas();



