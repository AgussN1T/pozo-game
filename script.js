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
document.getElementById('contador-pozoRestante').textContent = `${pozoJugador.length}`;



selectorFondo.addEventListener('change', (e) => {
    document.body.className = ''; // limpia fondos previos
    document.body.classList.add(`fondo-${e.target.value}`);
});



mesaElements.forEach((mesaElement, indexDestino) => {
    mesaElement.addEventListener('click', () => {

        if (!cartaSeleccionada) return;

        if (!validarJugada(indexDestino, cartaSeleccionada, mesa)) {
            cartaSeleccionada = null;
            origenSeleccionado = null;
            return;
        }

        if (origenSeleccionado.tipo === 'mano') {

            manoJugador.splice(origenSeleccionado.index, 1);
            mostrarCartas();
        }

        if (origenSeleccionado.tipo === 'pozo') {
            document.getElementById('contador-pozoRestante').textContent = `${pozoJugador.length}`;
            pozoJugador.pop();
            mostrarPozo();
        }

        if (origenSeleccionado.tipo === 'slot') {
            slots[origenSeleccionado.index].pop();
            mostrarSlot(origenSeleccionado.index);
        }

        document
            .querySelectorAll('.carta.seleccionada')
            .forEach(c => c.classList.remove('seleccionada'));
        mesa[indexDestino].push(cartaSeleccionada);
        mostrarMesa(indexDestino);

        if (mesa[indexDestino].length === 13) {
            mesaElement.innerHTML = '';
            mesa[indexDestino] = [];
        }

        document.getElementById('contador-cartaJugada').textContent = `${cartaSeleccionada.valor} ${cartaSeleccionada.palo}`;
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

        document
            .querySelectorAll('.carta.seleccionada')
            .forEach(c => c.classList.remove('seleccionada'));

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

    renderizarCarta(divCarta,carta);

    divCarta.addEventListener('click', () => {

        if (divCarta.classList.contains('seleccionada')) {
            divCarta.classList.remove('seleccionada')
            cartaSeleccionada = null;
            origenSeleccionado = null;
            return;
        }

        document
            .querySelectorAll('.carta.seleccionada')
            .forEach(c => c.classList.remove('seleccionada'));


        cartaSeleccionada = carta;
        origenSeleccionado = { tipo: 'pozo' };
        divCarta.classList.add('seleccionada');

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
        // divCarta.innerHTML = `
        // <div class="valor arriba">${carta.valor}</div>
        // <div class="palo">${carta.palo}</div>
        // <div class="valor abajo">${carta.valor}</div>
        // `;

        renderizarCarta(divCarta,carta);


        divCarta.addEventListener('click', () => {

            if (divCarta.classList.contains('seleccionada')) {
                divCarta.classList.remove('seleccionada')
                cartaSeleccionada = null;
                origenSeleccionado = null;
                return;
            }

            document
                .querySelectorAll('.carta.seleccionada')
                .forEach(c => c.classList.remove('seleccionada'));


            cartaSeleccionada = carta;
            origenSeleccionado = { tipo: 'mano', index };

            divCarta.classList.add('seleccionada');


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
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');

        // caída visual
        divCarta.style.top = `${i * 18}px`;

        renderizarCarta(divCarta,cartaData);
        // divCarta.innerHTML = `
        //     <div class="valor arriba">${cartaData.valor}</div>
        //     <div class="palo">${cartaData.palo}</div>
        //     <div class="valor abajo">${cartaData.valor}</div>
        // `;

        // solo la de arriba es interactiva
        if (i === pila.length - 1) {
            divCarta.addEventListener('click', (e) => {
                if (origenSeleccionado?.tipo === 'mano') {
                    return;
                }

                e.stopPropagation();

                // toggle selección del slot
                if (divCarta.classList.contains('seleccionada')) {
                    divCarta.classList.remove('seleccionada');
                    cartaSeleccionada = null;
                    origenSeleccionado = null;
                    return;
                }

                document
                    .querySelectorAll('.carta.seleccionada')
                    .forEach(c => c.classList.remove('seleccionada'));

                cartaSeleccionada = cartaData;
                origenSeleccionado = { tipo: 'slot', index };

                divCarta.classList.add('seleccionada');
            });
        }
        else {
            divCarta.style.pointerEvents = 'none';
        }

        slotElement.appendChild(divCarta);
    });
}


function mostrarMesa(index) {
    const mesaElement = mesaElements[index];
    mesaElement.innerHTML = '';

    if (mesa[index].length === 0) return;

    const carta = mesa[index][mesa[index].length - 1];

    const divCarta = document.createElement('div');
    divCarta.classList.add('carta');

    renderizarCarta(divCarta, carta);

    mesaElement.appendChild(divCarta);
}




const modalVictoria = document.getElementById('modal-victoria-fondo');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnSalir = document.getElementById('btn-salir');

function mostrarVictoria() {
    clearInterval(intervalo);
    const tiempoAlcanzado = document.getElementById("cronometro").innerText;
    document.getElementById("tiempo-modal").innerText = tiempoAlcanzado;
    modalVictoria.classList.remove('oculto');
}

function ocultarVictoria() {
    modalVictoria.classList.add('oculto');
}

btnReiniciar.addEventListener('click', () => {
    ocultarVictoria();
    location.reload();
});

btnSalir.addEventListener('click', () => {
    ocultarVictoria();
    location.reload();
});


function renderizarCarta(divCarta, carta) {

    if (carta.valor === 0) {
        divCarta.innerHTML = `
        <div class="valor arriba"></div>
        <div class="palo">${carta.palo}</div>
        <div class="valor abajo"></div>
    `;
        return;
    }

    if (carta.valor === 1) {
        divCarta.innerHTML = `
        <div class="valor arriba">A</div>
        <div class="palo">${carta.palo}</div>
        <div class="valor abajo">A</div>
    `;
        return;
    }
    
    if(carta.valor <=10){
        divCarta.innerHTML = `
        <div class="valor arriba">${carta.valor}</div>
        <div class="palo">${carta.palo}</div>
        <div class="valor abajo">${carta.valor}</div>
    `;
        return;
    }

    if (carta.valor === 11) {
        divCarta.innerHTML = `
        <div class="valor arriba">J</div>
        <div class="palo">${carta.palo}</div>
        <div class="valor abajo">J</div>
    `;
        return;
    }
    if (carta.valor === 12) {
        divCarta.innerHTML = `
        <div class="valor arriba">Q</div>
        <div class="palo">${carta.palo}</div>
        <div class="valor abajo">Q</div>
    `;
        return;
    }
    if (carta.valor === 13) {
        divCarta.innerHTML = `
        <div class="valor arriba">K</div>
        <div class="palo">${carta.palo}</div>
        <div class="valor abajo">K</div>
    `;
        return;
    }


}

function iniciarCronometro() {
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        segundos++;
        
        let m = Math.floor(segundos / 60);
        let s = segundos % 60;

        let tiempoTexto = 
            (m < 10 ? "0" + m : m) + ":" + 
            (s < 10 ? "0" + s : s);

        document.getElementById("cronometro").innerText = tiempoTexto;
    }, 1000);
}

let segundos = 0;
let intervalo;


document.body.classList.add('fondo-mesa');

mostrarPozo();
mostrarCartas();

iniciarCronometro();



