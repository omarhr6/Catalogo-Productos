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
    requestURLBase: 'https://api.walmartlabs.com/v1/search?',
    categories: {
        watch:  '3891_3906',
        tablet: '3944_1078524_1078084',
        camera: '3944_133277_1096663'
    },
    last: {
        data: [],      // Última response parseada
        category: '',  // Última categoría pedida
        page: {
            // Página para el próximo request de dicha categoría
            watch:  1,
            tablet: 1,
            camera: 1
        },
        // Elementos por página; No cambiar
        itemsPerPage: 5
    },
    parseResponse: function(r) {
        // TODO Validación / comprobar tamaño arrays antes de acceder
        var results = r.items;
        for (var i = 0; i < results.length; i++){
            var p = new Product();
            p.title       = results[i].name;
            p.price       = results[i].salePrice || results[i].msrp;
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
        'query=' + category +
        '&category=' + this.categories[category] +
        '&apiKey=' + walmartAPI.key +
        '&sort=' + 'bestseller' +
        '&numItems=' + this.last.itemsPerPage +
        '&start=' + (1 + (this.last.itemsPerPage * (this.last.page[category] - 1))) +
        '&facet=on' +
        '&facet.range=price:[0 TO 1000]';
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
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(jqXHR, textStatus, errorThrown);
            },
            complete: function() {
                this.last.page[category] += 1;
            }
        });
    }
};
