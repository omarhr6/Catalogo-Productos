/**
 * @file Modelo para los productos
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* eslint no-unused-vars: 0 */

// REVIEW Sujeto a cambios
var Product = function() {
    this.title = '';       //
    this.price = 0.00;     //
    this.type = '';        // En minúscula -> watches || tablets || cameras
    this.store = '';       // En minúscula -> ebay || walmart
    this.picture = '';     // Link (HTTPS para evitar problemas con GitHub)
    this.description = ''; //
    this.link = '';        // Link (HTTPS para evitar problemas con GitHub)
};
