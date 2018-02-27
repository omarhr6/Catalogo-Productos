/**
 * @file Lógica principal de la página
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $, eBayAPI */


// TEMP Para probar
var products = [];

// TEMP Para probar, pasar a React
function createCards() {
    products.forEach(function(p) {
        var container = $('.container');
        container.append(
            '<div class="card">' +
            '<img src="' + p.picture + '"/>' +
            '<div class="price">' + p.price + ' €</div>' +
            '<div class="title">' + p.title + '</div>' +
            '<div class="description">' + p.description + '</div>' +
            '<div class="logo logo-' + p.store + '"></div>' +
            '<a href="' + p.link + '"> Link </div>' +
            '</div>');
        var card = $('.card').last();
    });
}

/**
 * Función de inicio
 */
function start() {
    $.when(
        eBayAPI.fetchData()
    ).done(function(eBayAPICall) {
        // call -> [ response, textStatus, jqXHR ]
        products = $.merge(products, eBayAPI.lastResquest);
        createCards();
    }).fail(function() {
    }).always(function() {
    });
}

$(document).ready(start);
