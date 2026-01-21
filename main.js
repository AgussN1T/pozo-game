const { cargarCartas } = require('./funciones.js')
const { mezclarMazo } = require('./funciones.js')
const { repartirCartas } = require('./funciones.js')
const { cargarPozo } = require('./funciones.js')
const { colocarCarta } = require('./funciones.js')
const { guardarCarta } = require('./funciones.js')

const prompt = require('prompt-sync')({ sigint: true });
const config = require('./config.json');

const cartas = config.cartas;
/*console.log("cartas actuales");
console.log(cartas);*/

const cartasTotales = cargarCartas(cartas, config);
/*console.log("cartas totales");
console.log(cartasTotales);*/

let mazo = mezclarMazo(cartasTotales);
/*console.log("mazo mezclado");
console.log(mazo);*/

let pozoJugador = cargarPozo(mazo, config);

const manoJugador = [];

repartirCartas(manoJugador, mazo, config)

console.log("setup de inicio de juego");
console.log("Mano del Jugador");
console.log(manoJugador);
console.log("Pozo del Jugador");
console.log(pozoJugador);
console.log("Mazo en la mesa");
console.log(mazo);

const mesa = [[], [], [], []];

const mesaJugador = [[], [], [], []];
// guardarCarta(mesaJugador, manoJugador[1], 0); issue terminada



console.clear()
/*
const mesa = [
[1, 2, 3, 4, 5, 6], 
[1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 
[1, 2, 3], 
[]];
*/

console.log("Mano del jugador: ", manoJugador);
console.log("Pozo: ", pozoJugador);

console.log("mesa");
console.log(mesa);

//poner carta
//Bloque de juego
const numeroCarta = Number(prompt("Ingrese la carta que desea jugar: "));


if (numeroCarta === 6) {
    console.log("Pozo: ", pozoJugador);
    console.log("Jugara la carta del pozo, la cual es: ", pozoJugador[0]);

    let carta = pozoJugador.splice(0, 1)[0];
    //devuelve la carta
    if (!colocarCarta(mesa, carta)) { pozoJugador.unshift(carta); }
    else{ if (pozoJugador.length === 0) { console.log("El pozo está vacío, ganaste."); }
}

if (isNaN(numeroCarta) || (numeroCarta > config.maximoMano - 1) || (numeroCarta < 0)) {
    console.log("Eso no es un número válido!");
} else {
    console.log("Mano del jugador: ", manoJugador);
    console.log("Jugara la carta de la mano: ", numeroCarta, " con valor es: ", manoJugador[numeroCarta]);

    let carta = manoJugador.splice(numeroCarta, 1)[0];

    if (!colocarCarta(mesa, manoJugador[numeroCarta])) { manoJugador.push(carta); }
}



console.log("Mano del jugador: ", manoJugador);

console.log("Pozo del jugador: ", pozoJugador);
console.log(mesa);


console.log("Mesa del jugador");
console.log(mesaJugador);




}
