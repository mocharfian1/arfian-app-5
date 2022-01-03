'use strict'

const TemplateAttribute = require("../model/TemplateAttribute");

exports.getItemListsByTemplateId = function (connection,optItems){
    return connection.template_getItems(optItems.fields,optItems.sort,optItems.filter,optItems.limit,optItems.offset)
}