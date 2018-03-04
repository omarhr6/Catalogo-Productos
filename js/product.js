/**
 * @file Modelo para los productos
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* eslint no-unused-vars: 0 */

var Product = function() {
    this.title =       '';   // Título
    this.price =       0.00; // Precio en dólares
    this.type =        '';   // En minúscula -> watch || tablet || camera
    this.store =       '';   // En minúscula -> ebay || walmart
    this.picture =     '';   // Link (HTTPS para evitar problemas con GitHub)
    this.description = '';   // Descripción
    this.link =        '';   // Link (HTTPS para evitar problemas con GitHub)
    this.shortLength = 30;
};

Product.prototype.getShortTitle = function() {
    var words = this.title.split(' ');
    var shortTitle = '';
    for (var i = 0; i < words.length; i++) {
        if (shortTitle.length + words[i].length < this.shortLength) {
            shortTitle += ' ' + words[i];
        } else {
            break;
        }
    }
    return shortTitle;
};
