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
    this.title =       '';   // Título
    this.price =       0.00; // Precio en dólares
    this.type =        '';   // En minúscula -> watch || tablet || camera
    this.store =       '';   // En minúscula -> ebay || walmart
    this.picture =     '';   // Link (HTTPS para evitar problemas con GitHub)
    this.description = '';   // Descripción
    this.link =        '';   // Link (HTTPS para evitar problemas con GitHub)
};
