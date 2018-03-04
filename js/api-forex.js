/**
 * @file Interación con la API de Forex
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $ */
/* eslint no-unused-vars: 0 */

var forexAPI = {
    key: 'PwOUrs9kddsPVwOeAVmjKfhHylbIhPZQ',
    requestURLBase : 'https://forex.1forge.com/1.0.3/quotes?',
    exchange: {
        symbol: '$',
        rate: 1
    },
    parseResponse: function(r) {
        this.exchange.symbol = '€';
        this.exchange.rate = r[0].price;
    },
    fetchData: function(category) {
        var requestURL = this.requestURLBase +
        'pairs=' + 'USDEUR' +
        '&api_key=' +  this.key;
        return $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'JSON',
            context: this,
            success: function(r) {
                this.parseResponse(r);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(jqXHR, textStatus, errorThrown);
            }
        });
    }
};
