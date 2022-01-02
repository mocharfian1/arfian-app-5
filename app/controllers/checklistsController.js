'use strict';

var response = require('../response');
var db = require('../connection')

exports.index = function(req, res) {
    response.send("Moch Arfian", res)
};