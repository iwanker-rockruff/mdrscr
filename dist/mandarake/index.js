"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mandarakeFavorites = exports.mandarakeSearch = void 0;

var _request = require("./request");

var _urls = require("./urls");

var _categories = require("./categories");

var _shops = require("../common/shops");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Default search details. Every search overrides these values.
// You can change anything, but it's not recommended to change 'sort', 'sortOrder' and 'dispCount'.
var defaultDetails = {
  // What to search for. If empty, everything is displayed.
  keyword: '',
  // Limits results to a specific category.
  categoryCode: _categories.EVERYTHING[0],
  // Limits results to those physically at a specific Mandarake location.
  // Useful for combining items in one shipment.
  shop: _shops.ALL_STORES[0],
  // 0: hide adult items. 1: show adult items.
  dispAdult: 0,
  // 0: show sold out items. 1: hide sold out items.
  soldOut: 1,
  // Limits results to a maximum price of n yen.
  maxPrice: null,
  // Limits results to items added n minutes ago.
  // This should be set based on how often the bot runs.
  upToMinutes: 0,
  // eventually, set to 360
  // Changes the sort order. Not recommended to override.
  sort: 'arrival',
  // 0: ascending. 1: descending. Not recommended to override.
  sortOrder: 1,
  // How many results to show at most. Not recommended to override.
  // Should be as high as possible so we don't miss anything.
  dispCount: 240
  /**
   * Main entry point. Scrapes Mandarake's search results and returns info for the items found.
   * Search details are merged with our defaults first, and 'lang' defaults to Japanese if not set.
   */

};

var mandarakeSearch = function mandarakeSearch(searchDetails) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ja';

  var search = _objectSpread({}, defaultDetails, {}, searchDetails);

  var url = (0, _urls.mandarakeSearchURL)(search, lang);
  return (0, _request.getMandarakeSearch)(url, search, lang);
};
/**
 * Runs a search for a user's Mandarake favorites and returns either just the basic info
 * (same as the search result info) or also extended shop availability info.
 *
 * A progress callback can be passed. This will be called during the lengthy detail
 * fetching phase, which can take a long time if there are a lot of favorites.
 * If we need to get extended info, we need to request the detail pages for all those items.
 * The callback takes the signature (currItem, totalItems), both numbers.
 */


exports.mandarakeSearch = mandarakeSearch;

var mandarakeFavorites = function mandarakeFavorites() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ja';
  var getExtendedInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var progressCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return (0, _request.getMandarakeFavorites)((0, _urls.mandarakeFavoritesURL)(lang), lang, getExtendedInfo, progressCb);
};

exports.mandarakeFavorites = mandarakeFavorites;