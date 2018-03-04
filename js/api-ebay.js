/**
 * @file Interación con la API de eBay
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* global $, Product */
/* eslint no-unused-vars: 0 */

var eBayAPI = {
    key: 'AdrinExp-proyecto-PRD-451ca6568-33e7f5c2',
    requestURLBase : 'https://svcs.ebay.com/services/search/FindingService/v1?',
    categories: {
        watch:  31387,
        tablet: 171485,
        camera: 31388
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
        var results = r.findItemsByCategoryResponse[0].searchResult[0].item;
        for (var i = 0; i < results.length; i++) {
            var p = new Product();
            p.title       = results[i].title[0];
            p.price       = results[i].sellingStatus[0].currentPrice[0].__value__;
            p.store       = 'ebay';
            p.picture     = results[i].galleryURL[0].replace('http:', 'https:');
            p.description = results[i].subtitle;
            p.link        = results[i].viewItemURL[0].replace('http:', 'https:');
            p.type        = this.last.category;
            this.last.data.push(p);
        }
    },
    fetchData: function(category) {
        var requestURL = this.requestURLBase +
        'SECURITY-APPNAME=' +  this.key +
        '&OPERATION-NAME=' + 'findItemsByCategory' +
        '&SERVICE-VERSION=' + '1.0.0' +
        '&RESPONSE-DATA-FORMAT=' + 'JSON' +
        '&REST-PAYLOAD' +
        '&categoryId=' + this.categories[category] +
        '&paginationInput.entriesPerPage=' + this.last.itemsPerPage + // 1 - 100
        '&paginationInput.pageNumber=' + this.last.page[category] +   // 1 - 100
        '&itemFilter(0).name=' + 'HideDuplicateItems' +
        '&itemFilter(0).value=' + 'true' +
        '&itemFilter(1).name=' + 'ListingType' +
        '&itemFilter(1).value(0)=' + 'AuctionWithBIN' +
        '&itemFilter(1).value(1)=' + 'FixedPrice' +
        '&itemFilter(1).value(2)=' + 'StoreInventory' +
        '&itemFilter(2).name=' + 'MaxPrice' +
        '&itemFilter(2).value=' + '1000' +
        '&sortOrder=' + 'WatchCountDecreaseSort' +
        '&GLOBAL-ID=' + 'EBAY-US' +
        '&siteid=' + '0';
        return $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'JSONP',
            context: this,
            success: function(r) {
                this.last.data = [];
                this.last.category = category;
                this.parseResponse(r);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(jqXHR, textStatus, errorThrown);
            },
            complete: function() {
            }
        });
    }
};
