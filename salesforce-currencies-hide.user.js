// ==UserScript==
// @name         Salesforce — hide currencies
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hides the (AUD $xx.xx) from Salesforce
// @author       Mike Kelly @curioushuman
// @match        https://negotiate.lightning.force.com/*
// @grant        none
// @require https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var attemptIndex = 0;
    var extractAmount = /[A-Z]* ([0-9]*\.[0-9]*) \([A-Z]* [0-9]*\.[0-9]*\)/

    var hideCurrencies = function() {
        var currencies = $('span.forceOutputCurrency:not(.currencyHidden)');
        if (currencies.length > 0) {
            currencies.each(function(index) {
                var currencyAmount = $(this).text().match(extractAmount)[1];
                $(this).text(currencyAmount);
            });
        }
        attemptIndex++;
        if (attemptIndex < 10) {
            setTimeout(hideCurrencies, 2000);
        }
    };
    hideCurrencies();

})();
