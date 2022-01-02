'use strict';

var response = require('../response');
var db = require('../connection')
const TemplateAttribute = require("../model/TemplateAttribute");
const constants = require('../helper/constants');
// var template = require('../model/TemplateAttribute')

exports.index = function(req, res) {
    response.send("Moch Arfian", res)
};

// Create Checklist Template
exports.createChecklistTemplate = function(req, res) {
    try{
        const { headers, body  } = req;
        const { data } = body;
        const { attributes } = data;

        var checklist = attributes.checklist;
        checklist.type = "checklist";

        let vTemplates = null;
        let vChecklist = null;
        let vItems = null;

        db.template_create({name: attributes.name,type: "templates"}).then(({ dataValues })=>{
            vTemplates = dataValues;
            checklist.object_id = dataValues.id;

            db.template_create(checklist).then(({ dataValues })=>{
                vChecklist = dataValues;
                const items = attributes.items.map(v => Object.assign(v, { type: 'items', object_id: checklist.object_id }))

                db.template_bulkCreate(items).then((dataValues)=>{
                    vItems = dataValues;
                    response.send(TemplateAttribute.buildResponseCreateTemplate(vTemplates,vChecklist,vItems), res)
                }).catch(e => {
                    response.error(constants.INTERNAL_SERVER_ERROR_RESPONSE, constants.INTERNAL_SERVER_ERROR_CODE, res)
                });
            }).catch(e => {
                response.error(constants.INTERNAL_SERVER_ERROR_RESPONSE, constants.INTERNAL_SERVER_ERROR_CODE, res)
            });
        }).catch(e => {
            response.error(constants.INTERNAL_SERVER_ERROR_RESPONSE, constants.INTERNAL_SERVER_ERROR_CODE, res)
        });
    }catch (e){
        response.error(constants.BAD_REQUEST_RESPONSE, constants.BAD_REQUEST_CODE, res)
    }
};