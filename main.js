const { cargarCartas } = require('./funciones.js')
const { mezclarMazo } = require('./funciones.js')
const { repartirCartas } = require('./funciones.js')
const { cargarPozo } = require('./funciones.js')
const { colocarCarta } = require('./funciones.js')
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

let pozo = cargarPozo(mazo, config);

const manoJugador = [];

repartirCartas(manoJugador, mazo, config)

console.log("setup de inicio de juego");
console.log("Mano del Jugador");
console.log(manoJugador);
console.log("Pozo del Jugador");
console.log(pozo);
console.log("Mazo en la mesa");
console.log(mazo);

//const mesa = [[], [], [], []];

console.clear()
const mesa = [[1,2,3,4,5,6], [1,0,3,4,5,6,7,8,9,10,11,12], [1,2,3], []];

console.log(mesa);
console.log("Mano del jugador: ", manoJugador);

//poner carta
const prompt = require('prompt-sync')({ sigint: true });

const numeroCarta = Number(prompt("Ingrese la carta que desea jugar: "));

if (isNaN(numeroCarta) || (numeroCarta > config.maximoMano - 1) || (numeroCarta < 0)) {
    console.log("Eso no es un número válido!");
} else {
    console.log("Jugara la carta: ", numeroCarta, " la cual es: ", manoJugador[numeroCarta]);
}



colocarCarta(mesa,manoJugador,numeroCarta)

console.log("Mano del jugador: ", manoJugador);
console.log(mesa);






