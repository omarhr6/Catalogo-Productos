/**
 * @file Lógica principal de la página
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $, eBayAPI, walmartAPI */


// TEMP Para probar
var products = [];

// TEMP Para probar, pasar a React
function createCards() {
    products.forEach(function(p) {
        var container = $('.container');
        container.append(
            '<div class="card">' +
            '<img class="picture" src="' + p.picture + '"/>' +
            '<div class="price">$' + p.price + '</div>' +
            '<div class="title">' + p.title.slice(0, 20) + '</div>' +
            // '<div class="description">' + p.description + '</div>' +
            '<a href="' + p.link + '"><img class="logo logo-' + p.store +
            '" src="../img/' + p.store + '-logo.svg"></img></a>' +
            '</div>');
        var card = $('.card').last();
    });
}

/**
 * Función de inicio
 */
function start() {
    $.when(
        eBayAPI.fetchData(),
        walmartAPI.fetchData()
    ).done(function(eBayAPICall, walmartAPICall) {
        // call -> [ response, textStatus, jqXHR ]
        products = $.merge(products, eBayAPI.lastResquest);
        products = $.merge(products, walmartAPI.lastResquest);
        // products = $.map(eBayAPI.lastResquest, function(v, i) {
        //     return [v, walmartAPI.lastResquest[i]];
        // });
        createCards();
    }).fail(function() {
    }).always(function() {
    });
}

$(document).ready(start);
