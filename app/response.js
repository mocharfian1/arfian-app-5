'use strict';

exports.error = function (response,statusCode, option = null){
    option.statusCode = statusCode;
    option.json(response);
    option.end();
}

exports.send = function(response, option=null) {
    option.json(response);
    option.end();
};