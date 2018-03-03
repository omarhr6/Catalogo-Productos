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
        watch:  '3891_3906',
        tablet: '3944_1078524_1078084',
        camera: '3944_133277_1096663'
    },
    last: {
        data: [],
        category: '',
        page: 1
    },
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
            p.type        = this.last.category;
            this.last.data.push(p);
        }
    },
    fetchData: function(category) {
        var requestURL = this.requestURLBase +
        'query=' + 'watch' +
        '&category=' + this.categories[category] +
        '&apiKey=' + walmartAPI.key +
        '&sort=' + 'bestseller' +
        '&start=' + '30';
        return $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'JSONP',
            context: this,
            success: function(r){
                this.last.data = [];
                this.last.category = category;
                this.parseResponse(r);
            },
            error: function() {},
            complete: function() {
                this.last.page += 1;
            }
        });
    }
};



//'http://api.walmartlabs.com/v1/search?query=watches&categoryId=3891_3906&apiKey=k2m3dzgfa2wndb62pchpbw6d'
