/**
 * @file Utilidadess varias
 * @author Adrián Expósito Tofano
 */
/* eslint no-unused-vars: 0 */

'use strict';


/**
 * Devuelve un número aleatorio en el rango especificado
 * @param  {Integer}  a Uno de los límites del rango
 * @param  {Integer}  b El otro límite del rango
 * @return {Integer}    Número aleatorio
 */
function getRandomInt(a, b) {
    var min = Math.min(a, b);
    var max = Math.max(a, b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Baraja un array con una versión moderna del algoritmo de Fisher-Yates
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 * https://bost.ocks.org/mike/shuffle/
 * @param  {Array} array Array a barajar
 * @return {Array}       Array barajado
 */
function shuffle(array) {
    var newArray = array.slice(0);
    var currentIndex = newArray.length - 1;
    var temporaryValue;
    var randomIndex;

    // Mientras que queden elemnentos
    while (currentIndex != 0) {
        // Elegimos un elemento aleatorio
        randomIndex = getRandomInt(0, currentIndex);
        // Y lo intercambiamos con el elemento actual
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
        currentIndex -= 1;
    }

    return newArray;
}
