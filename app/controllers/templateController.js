'use strict';

var response = require('../response');
var db = require('../connection')
const TemplateAttribute = require("../model/TemplateAttribute");
const constants = require('../helper/constants');
const itemService = require("../service/itemService");
const templateService = require("../service/templateService");
const checklistServiice = require("../service/checklistService");
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

//List All Templates
exports.getListAllTemplates = function (req, res){
    TemplateAttribute._res(res)

    const { query } = req;

    let optTemplate = {
        filter: {type: 'templates' },
        sort: ['id', 'DESC'],
        fields: ['id','name','object_id'],
        offset: query.page_offset,
        limit: query.page_limit
    }

    const arrTemplates = [];

    let meta = {
        count : Number,
        total : Number
    }

    let link = {

    }

    db.template_getCountTemplates('templates').then((total)=>{
        meta.total = total
    }).catch(()=> {
        response.error(constants.BAD_REQUEST_RESPONSE, constants.BAD_REQUEST_CODE, res)
    })

    templateService.getAllTemplates(db,optTemplate).then(rTemplate => {
        meta.count = rTemplate.length
        rTemplate.map((valueTemplate, indexTemplate) => {
            let objectId = valueTemplate.dataValues.id

            let optChecklist = {
                filter: { type: 'checklist', object_id: objectId },
                fields: null
            }

            checklistServiice.getChecklistOneByTemplateId(db,optChecklist).then(rChecklist => {
                let indexArr = arrTemplates.push(TemplateAttribute._attributesModel(valueTemplate.dataValues)) - 1
                arrTemplates[indexArr].checklist = TemplateAttribute._checklistModel(rChecklist.dataValues)

                let optItems = {
                    filter: { type: 'items', object_id: objectId },
                    sort: ['id','DESC'],
                    fields: ['id','object_id','description','urgency','due_interval','due_unit'],
                    offset: null,
                    limit: null
                }

                itemService.getItemListsByTemplateId(db,optItems).then(rItems =>{
                    let arrItems = []
                    rItems.map((valueItems, indexItems)=>{
                        arrItems.push(TemplateAttribute._singleItemModel(valueItems.dataValues))
                        arrTemplates[indexTemplate].items = arrItems

                        if(indexTemplate === rTemplate.length - 1 && indexItems === rItems.length - 1){
                            response.send({ meta, link, data:arrTemplates }, TemplateAttribute.response())
                        }
                    })

                }).catch(()=> {
                    response.error(constants.BAD_REQUEST_RESPONSE, constants.BAD_REQUEST_CODE, res)
                })
            }).catch((e)=> {
                response.error(constants.BAD_REQUEST_RESPONSE, constants.BAD_REQUEST_CODE, TemplateAttribute.response())
            })
        })
    }).catch(()=> {
        response.error(constants.BAD_REQUEST_RESPONSE, constants.BAD_REQUEST_CODE, res)
    })
}