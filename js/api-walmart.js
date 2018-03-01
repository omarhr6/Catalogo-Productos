/**
 * @file Lógica principal de la página
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $, Product */
/* eslint no-unused-vars: 0 */

var walmartAPI = {
    key: 'k2m3dzgfa2wndb62pchpbw6d',
    requestURLBase: 'http://api.walmartlabs.com/v1/search?',
    categories: {
        watches: {name: 'watch', id: '3891_3906'},
        tablets: {name: 'tablet', id: '3944_1078524_1078084'},
        cameras: {name: 'camera', id: '3944_133277_1096663'}
    },
    lastResquest: [],
    parseResponse: function(r) {
        // TODO Validación / comprobar tamaño arrays antes de acceder
        var results = r.items;
        for (var i = 0; i < results.length; i++){
            var p = new Product();
            p.title       = results[i].name;
            p.price       = results[i].salePrice;
            p.store       = 'walmart';
            p.picture     = results[i].thumbnailImage.replace('http:', 'https:');
            p.description = results[i].shortDescription;
            p.link        = results[i].productUrl.replace('http:', 'https:');
            // XXX Feo?
            switch (r.categoryId) {
                case '3891_3906': p.type = 'watch'; break;
                case '3944_1078524_1078084': p.type = 'tablet'; break;
                case '3944_133277_1096663': p.type = 'camera'; break;
                // default: p.type = results[i].primaryCategory[0].categoryName;
            }
            this.lastResquest.push(p);
        }
    },
    fetchData: function() {
        var requestURL = this.requestURLBase +
        'query=' + 'watch' +
        '&category=' + this.categories.watches.id +
        '&apiKey=' + walmartAPI.key +
        '&sort=' + 'bestseller' +
        '&start=' + '30';
        return $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'JSONP',
            context: this,
            success: function(r){
                this.lastResquest = [];
                this.parseResponse(r);
            },
            error: function(a, b, c) {},
            complete: function() {}
        });
    }
};



//'http://api.walmartlabs.com/v1/search?query=watches&categoryId=3891_3906&apiKey=k2m3dzgfa2wndb62pchpbw6d'
