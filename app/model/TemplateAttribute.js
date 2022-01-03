'use strict'

let responseHTTP;

exports._res = function(res = null){
    responseHTTP = res
}

exports.response = function(){
    return responseHTTP
}

exports._checklistModel = function(checklist = null){
    try{
        return {
            description: checklist.description,
            due_interval: checklist.due_interval,
            due_unit: checklist.due_unit
        }
    }catch (e){
        return {}
    }
}

exports._itemsModel = function(items = []){
    try{
        return items.map((v) => {
            return {
                description: v.description,
                urgency: v.urgency,
                due_interval: v.due_interval,
                due_unit: v.due_unit
            }
        })
    }catch (e) {
        return e.message
    }
}

exports._singleItemModel = function(item){
    return {
        description: item.description,
        urgency: item.urgency,
        due_interval: item.due_interval,
        due_unit: item.due_unit
    }
}

exports._linksModel = function(links){
    return {
        first:links.first,
        last:links.last,
        next:links.next,
        prev:links.prev
    }
}

exports._attributesModel = function(template, checklist = null, items = null){
    return {
        name: template.name,
        checklist: checklist,
        items: items
    }
}

exports.buildResponseCreateTemplate = (template, checklist, items) => {
    return {
        data: {
            id: template.id,
            attributes: this._attributesModel(template,checklist,items)
        }
    }
}

exports.buildResponseListAllTemplates = (meta, links, template) => {
    return {
        meta: {
            count:meta.count,
            total:meta.total
        },
        links: this._linksModel(links),
        data: template.map((v) => {
            return v
            // return _attributesModel(v.name,_checklistModel(v.),items)
        })
    }
}