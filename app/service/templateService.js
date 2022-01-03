'use strict'

const TemplateAttribute = require("../model/TemplateAttribute");
const itemService = require("./itemService");

exports.getAllTemplates = function (connection, optTemplate){
    return connection.template_getItems(optTemplate.fields,optTemplate.sort,optTemplate.filter,optTemplate.limit,optTemplate.offset)
}

exports.getTemplateById = function (connection, optTemplate){
    return connection.template_getTemplateById(optTemplate.filter)
}