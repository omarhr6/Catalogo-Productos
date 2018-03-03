/**
 * @file Lógica principal de la página
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $, eBayAPI, walmartAPI */


// TEMP Para probar, pasar a React
function createCards(products) {
    products.forEach(function(p) {
        var container = $('.container');
        container.append(
            '<div class="card">' +
            '<img class="picture" src="' + p.picture + '"/>' +
            '<div class="price">$' + p.price + '</div>' +
            '<div class="title">' + p.title.slice(0, 20) + '</div>' +
            '<div class="description">' + p.description + '</div>' +
            '<a href="' + p.link + '"><img class="logo logo-' + p.store +
            '" src="../img/' + p.store + '-logo.svg"></img></a>' +
            '</div>');
        var card = $('.card').last();
        card.data(p);
    });
}

function filterCards() {
    var cards = $('.card');
    var store = $('#store').val();
    var category = $('#category').val();
    var range = $('#slider-range').slider('values');
    cards.hide();
    cards.filter(function() {
        var card = $(this);
        var price = card.data('price');
        return ((card.data('type')  === category || category === 'all') &&
                (card.data('store') === store    || store    === 'all') &&
                (price >= range[0] && price <= range[1]));
    }).show();
}

/**
 * Función de inicio
 */
function start() {
    // Configuración de jQuery UI //

    // Configuración del slider para el filtrado de precios
    $('#slider-range').slider({
        range: true,
        min: 0,
        max: 1000,
        values: [0, 1000],
        slide: function(event, ui) {
            $('#amount').text('$' + ui.values[0] + ' - $' + ui.values[1]);
        },
        stop: function() {
            filterCards();
        }
    });

    // Actualización del texto con el rango de precio
    $('#amount')
        .text('$' + $('#slider-range')
            .slider('values', 0 ) + ' - $' + $('#slider-range')
                .slider('values', 1 ));

    // Configuración del select para el filtrado por tienda
    $('#store').selectmenu({
        change: function() {
            filterCards();
        }
    });

    // Configuración del select para el filtrado por categoría
    $('#category').selectmenu({
        change: function() {
            var cards = $('.card');
            var category = $(this).val();
            if (category === 'all') {
                cards.show();
            } else {
                cards.hide();
                cards.filter(function() {
                    return $(this).data('type') === category;
                }).show();
            }
        }
    });

    // TEMP Carga de datos
    $.when(
        eBayAPI.fetchData(),
        walmartAPI.fetchData()
    ).done(function(eBayAPICall, walmartAPICall) {
        // call -> [ response, textStatus, jqXHR ]
        var products = [];
        products = $.merge(products, eBayAPI.lastResquest);
        products = $.merge(products, walmartAPI.lastResquest);
        // products = $.map(eBayAPI.lastResquest, function(v, i) {
        //     return [v, walmartAPI.lastResquest[i]];
        // });
        createCards(products);
    }).fail(function() {
    }).always(function() {
    });
}

$(document).ready(start);
