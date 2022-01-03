'use strict';

var response = require('../response');
var db = require('../connection')
const constants = require('../helper/constants');
const TemplateAttribute = require("../model/TemplateAttribute");

exports.index = function(req, res) {
    response.send("Moch Arfian", res)
};

exports.createChecklist = function(req, res) {
    try{
        const { headers, body  } = req;
        const { data } = body;
        const { attributes } = data;

        // var checklist = attributes.checklist;
        attributes.type = "checklist";
        attributes.is_complete = false;
        attributes.completed_at = null;

        //
        // let vTemplates = null;
        let vChecklist = null;
        let vItems = null;

        db.template_create(attributes).then(({ dataValues })=>{
            vChecklist = dataValues;

            const items = attributes.items.map(v => Object.assign(v, { type: 'items' }))

            db.item_bulkCreate_fromTemplate(items).then((dataValues)=>{
                vItems = dataValues;
                response.send(TemplateAttribute.buildResponseCreateChecklist(vChecklist,vItems,{ self: '' }), res)
            }).catch(e => {
                response.error(constants.INTERNAL_SERVER_ERROR_RESPONSE, constants.INTERNAL_SERVER_ERROR_CODE, res)
            });
        }).catch(e => {
            console.error("Failed to create Checklist", e.message)
            response.error(constants.INTERNAL_SERVER_ERROR_RESPONSE, constants.INTERNAL_SERVER_ERROR_CODE, res)
        });
    }catch (e){
        response.error(constants.BAD_REQUEST_RESPONSE, constants.BAD_REQUEST_CODE, res)
    }
};