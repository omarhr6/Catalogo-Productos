/**
 * @file Lógica principal de la página
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $, forexAPI, eBayAPI, walmartAPI, shuffle */


// Crea las tarjetas de productos según un array con elementos Product
function createCards(products) {
    products.forEach(function(p) {
        var container = $('#container');
        container.append(
            '<div class="card">' +
            '<img class="picture" src="' + p.picture + '"/>' +
            '<div class="price">' + (p.price * forexAPI.exchange.rate).toFixed(2) + forexAPI.exchange.symbol + '</div>' +
            '<div class="title">' + p.getShortTitle() + '</div>' +
            '<div class="description">' + p.description + '</div>' +
            '<a href="' + p.link + '"><img class="logo logo-' + p.store +
            '" src="img/' + p.store + '-logo.svg"></img></a>' +
            '</div>');
        var card = $('.card').last();
        card.data(p);
    });
}

// Filtra las tarjetas (show/hide) segun los filtros seleccionados (precio, tienda, precio)
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

// Ordena las tarjetas según el precio en el orden especificado (price-asc||price-desc)
function sortCards(order) {
    var cards = $('.card');
    cards.sort(function(a, b){
        var priceA = $(a).data('price');
        var priceB = $(b).data('price');
        if (order === 'price-asc') {
            return priceA - priceB;
        } else if (order === 'price-desc') {
            return priceB - priceA;
        }
    });
    cards.detach().appendTo($('#container'));
}

// Carga los productos
function loadProducts(categories) {

    if (categories && categories.length > 0) {
        fetchData(categories.pop());
    }

    function fetchData(category) {
        $('.ajax-spinner').css('display', 'block');
        $.when(
            eBayAPI.fetchData(category),
            walmartAPI.fetchData(category)
        ).done(function() {
            // call -> [ response, textStatus, jqXHR ]
            var products = [];
            products = $.merge(products, eBayAPI.last.data);
            products = $.merge(products, walmartAPI.last.data);
            products = shuffle(products);
            createCards(products);
            sortCards();
            filterCards();
        }).fail(function() {
            // $('.ajax-error').css('display', 'block');
        }).always(function() {
            $('.ajax-spinner').css('display', 'none');
            if (categories.length > 0) {
                fetchData(categories.pop());
            }
        });
    }
}

// Función de inicio
function start() {
    // Ocultamos elementos de login en caso de no estar logeado //
    $('.user-login').hide();

    // Configuración de jQuery UI //

    // Configuración del slider para el filtrado de precios
    $('#slider-range').slider({
        range: true,
        min: 0,
        max: 1000,
        values: [0, 1000],
        slide: function(event, ui) {
            $('#amount').text(
                ui.values[0] +
                forexAPI.exchange.symbol + ' - ' +
                ui.values[1] +
                forexAPI.exchange.symbol);
        },
        stop: function() {
            filterCards();
        }
    });

    // Actualización del texto con el rango de precio
    $('#amount')
        .text(
            $('#slider-range').slider('values', 0 ) + forexAPI.exchange.symbol +
            ' - ' + $('#slider-range').slider('values', 1 ) + forexAPI.exchange.symbol);

    // Configuración del select para el filtrado por tienda
    $('#store').selectmenu({
        change: function() {
            filterCards();
        }
    });

    // Configuración del select para el filtrado por categoría
    $('#category').selectmenu({
        change: function() {
            filterCards();
        }
    });

    // Configuración del select para el ordenado por categoría
    $('#order').selectmenu({
        change: function() {
            var order = $('#order').val();
            if (order !== 'none') {
                sortCards(order);
            }
        }
    });

    // TEMP FIXME Botón para cargar más productos
    $('.load-more').on('click', function() {
        var category = $('#category').val();
        var categories = [];
        if (category === 'all') {
            categories = ['watch', 'tablet', 'camera'];
        } else {
            for (var i = 0; i < 3; i++) {
                categories.push(category);
            }
        }
        loadProducts(categories);
    });

    // Carga inicial de productos
    loadProducts(['watch', 'tablet', 'camera']);
    //Cargar info de usuarios desde login.js
    window.cargarInfoUsuario();
}

$(document).ready( function() {
    $.when(
        forexAPI.fetchData()
    ).always(start);
});
