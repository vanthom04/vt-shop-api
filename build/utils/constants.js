"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVerifyCodeValid = exports.filterProducts = exports.WHITELIST_DOMAINS = void 0;
var WHITELIST_DOMAINS = exports.WHITELIST_DOMAINS = ['http://localhost:6100'];
var isVerifyCodeValid = exports.isVerifyCodeValid = function isVerifyCodeValid(savedTimestamp, expirationTime) {
  var currentTimestamp = Date.now();
  var timeDifference = currentTimestamp - savedTimestamp;
  return timeDifference <= expirationTime;
};
var filterProducts = exports.filterProducts = function filterProducts(products, filters) {
  return products.filter(function (product) {
    var nameCondition = !filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase());
    var brandCondition = !filters.brand || product.brand.toLowerCase() === filters.brand.toLowerCase();
    var categoryCondition = !filters.category || product.category.toLowerCase() === filters.category.toLowerCase();
    var featuredCondition = !filters.featured || product.featured.toString().toLowerCase() === filters.featured.toLowerCase();
    return nameCondition && brandCondition && categoryCondition && featuredCondition;
  });
};