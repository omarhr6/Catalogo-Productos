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
    requestURLBase: 'https://api.walmartlabs.com/v1/paginated/items?',
    categoryId: {
        watches: '3891_3906',
        tablets: '3944_1078524_1078084',
        cameras: '3944_133277_1096663'
    },
    lastResquest: [],
    parseResponse: function(r) {
        console.log(r);
        // TODO Validación / comprobar tamaño arrays antes de acceder
        var results = r.items;
        console.log(results);
        for (var i = 0; i < results.length; i++){
            var p = new Product();
            p.title       = results[i].name;
            p.price       = results[i].salePrice;
            p.store       = 'walmart';
            p.picture     = results[i].thumbnailImage;
            p.description = results[i].shortDescription;
            p.link        = results[i].productUrl;
            // XXX Feo?
            switch (r.categoryId) {
                case '3891_3906': p.type = 'watches'; break;
                case '3944_1078524_1078084': p.type = 'tablets'; break;
                case '3944_133277_1096663': p.type = 'cameras'; break;
                // default: p.type = results[i].primaryCategory[0].categoryName;
            }
            this.lastResquest.push(p);
        }
    },
    fetchData: function() {
        var requestURL = this.requestURLBase +
        // 'format=' + 'json' +
        'category=' + this.categoryId.watches +
        '&apiKey=' + walmartAPI.key;
        console.log(requestURL);
        return $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'JSONP',
            context: this,
            success: function(r){
                console.log(r);
                this.lastResquest = [];
                this.parseResponse(r);
            },
            error: function(a, b, c) {
                console.log(a, b, c);
            },
            complete: function() {}
        });
    }
};



//'http://api.walmartlabs.com/v1/search?query=watches&categoryId=3891_3906&apiKey=k2m3dzgfa2wndb62pchpbw6d'