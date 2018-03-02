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
            '<div class="description">' + p.description + '</div>' +
            '<a href="' + p.link + '"><img class="logo logo-' + p.store +
            '" src="../img/' + p.store + '-logo.svg"></img></a>' +
            '</div>');
        var card = $('.card').last();
        card.data(p);
    });
}

/**
 * Función de inicio
 */
function start() {
    // Configuración de jQuery UI
    $('#slider-range').slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ 0, 1000 ],
        slide: function( event, ui ) {
            $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
            var cards = $('.card');
            cards.hide();
            cards.filter(function() {
                var price = $(this).data('price');
                return (price >= ui.values[0] && price <= ui.values[1]);
            }).show();
        }
    });
    $('#amount').val('$' + $('#slider-range').slider( 'values', 0 ) +
    ' - $' + $('#slider-range').slider('values', 1 ));

    // Eventos de filtrado
    $('#store').on('change', function() {
        var cards = $('.card');
        var store = $(this).val();
        if (store === 'all') {
            cards.show();
        } else {
            cards.hide();
            cards.filter(function() {
                return $(this).data('store') === store;
            }).show();
        }
    });

    $('#category').on('change', function() {
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
    });


    // TEMP Carga de datos
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
