import {
    generarCartas,
    mezclarMazo,
    cargarPozo,
    repartirCartas,
    validarJugada
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



const selectorFondo = document.getElementById('selector-fondo');
selectorFondo.addEventListener('change', (e) => {
    document.body.className = ''; // limpia fondos previos
    document.body.classList.add(`fondo-${e.target.value}`);
});



mesaElements.forEach((mesaElement, indexDestino) => {
    mesaElement.addEventListener('click', () => {

        if (!cartaSeleccionada) return;

        if(!validarJugada(indexDestino,cartaSeleccionada,mesa)) {
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

        if (mesa[indexDestino].length === 13) {
            mesaElement.innerHTML = '';
            mesa[indexDestino] = [];
        }

        document.getElementById('contador-cartaJugada').textContent = `Ultima carta jugada: ${cartaSeleccionada.valor} ${cartaSeleccionada.palo}`;
        // console.log(mesa);

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
        mostrarVictoria();
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

    const pila = slots[index];
    if (pila.length === 0) return;

    pila.forEach((cartaData, i) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');

        // caída visual
        carta.style.top = `${i * 18}px`;

        carta.innerHTML = `
            <div class="valor arriba">${cartaData.valor}</div>
            <div class="palo">${cartaData.palo}</div>
            <div class="valor abajo">${cartaData.valor}</div>
        `;

        // solo la de arriba es interactiva
        if (i === pila.length - 1) {
            carta.addEventListener('click', (e) => {
                if (cartaSeleccionada) return;
                e.stopPropagation();
                cartaSeleccionada = cartaData;
                origenSeleccionado = { tipo: 'slot', index };
            });
        } else {
            carta.style.pointerEvents = 'none';
        }

        slotElement.appendChild(carta);
    });
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




const modalVictoria = document.getElementById('modal-victoria-fondo');
// const btnReiniciar = document.getElementById('btn-reiniciar');
const btnSalir = document.getElementById('btn-salir');

function mostrarVictoria() {
    modalVictoria.classList.remove('oculto');
}

function ocultarVictoria() {
    modalVictoria.classList.add('oculto');
}

// btnReiniciar.addEventListener('click', () => {
//     ocultarVictoria();
//     iniciarJuego(); // tu función existente
// });

btnSalir.addEventListener('click', () => {
    location.reload();
});




document.body.classList.add('fondo-mesa');

mostrarPozo();
mostrarCartas();



