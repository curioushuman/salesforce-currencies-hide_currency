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

    var pauseTime = 1500;
    var amountPattern = /[A-Z]{3} ([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9]) \([A-Z]{3} ([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])\)/

    var hideCurrencies = function() {
        var currencies = $('span.forceOutputCurrency:not(.currencyHidden)');
        var currencyMatches = [];
        var currencyAmount = '';
        if (currencies.length > 0) {
            currencies.each(function(index) {
                currencyMatches = $(this).text().match(amountPattern);
                if (currencyMatches !== null) {
                    currencyAmount = currencyMatches[1] + currencyMatches[3];
                    $(this).text(currencyAmount).addClass('currencyHidden');
                }
            });
        }
        setTimeout(hideCurrencies, pauseTime);
    };
    hideCurrencies();

})();
