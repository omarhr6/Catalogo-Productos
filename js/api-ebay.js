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
        watches: {name: 'watch', id: 31387},
        tablets: {name: 'tablet', id: 171485},
        cameras: {name: 'camera', id: 31388}
    },
    lastResquest: [],
    parseResponse: function(r, category) {
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
            p.type        = category;
            this.lastResquest.push(p);
        }
    },
    fetchData: function() {
        var requestURL = this.requestURLBase +
        'SECURITY-APPNAME=' +  eBayAPI.key +
        '&OPERATION-NAME=' + 'findItemsByCategory' +
        '&SERVICE-VERSION=' + '1.0.0' +
        '&RESPONSE-DATA-FORMAT=' + 'JSON' +
        '&REST-PAYLOAD' +
        '&categoryId=' + this.categories.watches.id +
        '&paginationInput.entriesPerPage=' + '10' + // Máximo de 100
        '&itemFilter(0).name=' + 'HideDuplicateItems' +
        '&itemFilter(0).value=' + 'true' +
        '&itemFilter(1).name=' + 'ListingType' +
        '&itemFilter(1).value(0)=' + 'AuctionWithBIN' +
        '&itemFilter(1).value(1)=' + 'FixedPrice' +
        '&itemFilter(1).value(2)=' + 'StoreInventory' +
        '&sortOrder=' + 'WatchCountDecreaseSort' +
        '&GLOBAL-ID=' + 'EBAY-US' +
        '&siteid=' + '0';
        return $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'JSONP',
            context: this,
            success: function(r) {
                this.lastResquest = [];
                this.parseResponse(r, 'watch');
            },
            error: function() {},
            complete: function() {}
        });
    }
};
