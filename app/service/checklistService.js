'use strict'

exports.getChecklistByTemplateId = function (connection,optChecklist){
    return connection.template_getItems(optChecklist.fields,optChecklist.sort,optChecklist.filter,optChecklist.limit,optChecklist.offset)
}

exports.getChecklistOneByTemplateId = function (connection,optChecklist){
    return new Promise((resolve, reject) => {
        connection.template_getChecklistOne(optChecklist.fields,optChecklist.filter).then((getOne)=>{
            resolve(getOne)
        }).catch(()=>{
            console.log("ERROR")
        })
    })

}