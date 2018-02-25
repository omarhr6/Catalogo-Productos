/**
 * @file Lógica principal de la página
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $ */

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

// TEMP Para probar
var products = [];

var eBayAPI = {
    key: 'AdrinExp-proyecto-PRD-451ca6568-33e7f5c2',
    requestURLBase : 'https://svcs.ebay.com/services/search/FindingService/v1?',
    categories: {
        watches: 31387,
        tablets: 171485,
        cameras: 31388
    },
    parseResponse: function(r) {
        // TODO Validación / comprobar tamaño arrays antes de acceder
        var results = r.findItemsByCategoryResponse[0].searchResult[0].item;
        for (var i = 0; i < results.length; i++) {
            var p = new Product();
            p.title       = results[i].title;
            p.price       = results[i].sellingStatus[0].currentPrice[0].__value__;
            p.store       = 'ebay';
            p.picture     = results[i].galleryURL[0];
            p.description = results[i].subtitle;
            p.link        = results[i];
            // XXX Feo?
            switch (results[i].primaryCategory[0].categoryId) {
                case 31387: p.type = 'watches'; break;
                case 171485: p.type = 'tablets'; break;
                case 31388: p.type = 'cameras'; break;
                default: p.type = results[i].primaryCategory[0].categoryName;
            }
            products.push(p);
        }
    }
};

/**
 * Función de inicio
 */
function start() {
    // TEMP Para probar
    var requestURL = eBayAPI.requestURLBase +
    'SECURITY-APPNAME=' +  eBayAPI.key +
    '&OPERATION-NAME=' + 'findItemsByCategory' +
    '&SERVICE-VERSION=' + '1.0.0' +
    '&RESPONSE-DATA-FORMAT=' + 'JSON' +
    '&REST-PAYLOAD' +
    '&categoryId=' + eBayAPI.categories.watches +
    '&paginationInput.entriesPerPage=' + '10' + // Máximo de 100
    '&GLOBAL-ID=' + 'EBAY-US' +
    '&siteid=' + '0';
    $.ajax({
        url: requestURL,
        type: 'GET',
        dataType: 'JSONP',
        success: function(r) {
            eBayAPI.parseResponse(r);
        },
        error: function() {},
        complete: function() {}
    });
}

$(document).ready(start);
