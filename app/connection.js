'use strict';

const Sequelize = require('sequelize');
const Constant = require("./helper/constants");

const db = new Sequelize('ski_telkom', null, null, {
    dialect: "sqlite",
    storage: './database/ski_telkom',
});

const tableTemplate = db.define('ski_template', {
    type: Sequelize.STRING,
    name: Sequelize.STRING,
    object_domain: Sequelize.STRING,
    object_id: Sequelize.STRING,
    due: Sequelize.STRING,
    task_id: Sequelize.STRING,
    description: Sequelize.STRING,
    due_interval: Sequelize.INTEGER,
    due_unit: Sequelize.STRING,
    urgency: Sequelize.INTEGER,
    is_complete: Sequelize.BOOLEAN,
    completed_at: Sequelize.STRING
});

exports.template_create = function (data){
    return new Promise((resolve, reject) => {
        tableTemplate.create(data).then((res)=>{
            return resolve(res);
        }).catch((e)=>{
            return reject(e);
        })
    })
}

exports.template_bulkCreate = function (data){
    return new Promise((resolve, reject) => {
        tableTemplate.bulkCreate(data).then((res)=>{
            return resolve(res);
        }).catch((e)=>{
            return reject(e);
        })
    })
}

exports.template_getAllTemplates = function (fields = [], sort = [], filter = {}, limit = 10, offset = 0){
    return new Promise((resolve, reject) => {
        tableTemplate.findAll({ attributes:fields, where: filter, offset: offset, limit: limit, order: [sort] }).then((res)=>{
            return resolve(res);
        })
    });
}

exports.template_getAllChecklists = function (fields = null, sort = null, filter = null, limit = 10, offset = 0){
    return new Promise((resolve, reject) => {
        tableTemplate.findAll({ attributes:fields, where: filter, offset: offset, limit: limit, order: [sort] }).then((res)=>{
            return resolve(res);
        })
    });
}

exports.template_getChecklist = function (fields = null, sort = null, filter = null, limit = 10, offset = 0){
    return new Promise((resolve, reject) => {
        tableTemplate.findOne({ where: filter }).then((res)=>{
            console.log(res)
            return resolve(res);
        })
    });
}

exports.template_getItems = function (fields = null, sort = null, filter = null, limit = 10, offset = 0){
    return new Promise((resolve, reject) => {
        tableTemplate.findAll({ attributes:fields, where: filter, offset: offset, limit: limit, order: [sort] }).then((res)=>{
            return resolve(res);
        }).catch((e)=>{
            return reject({})
        })
    });
}

exports.template_getTemplateById = function (filter= null){
    return new Promise((resolve, reject) => {
        tableTemplate.findOne({ where: filter}).then((res)=>{
            return resolve(res);
        }).catch((e)=>{
            return reject({})
        })
    });
}

exports.template_getChecklistOne = function (fields = null, filter = null){
    return new Promise((resolve, reject) => {
        tableTemplate.findOne({ attributes:fields, where: filter }).then((res)=>{
            return resolve(res);
        })
    });
}

exports.template_getCountTemplates = function (type){
    return new Promise((resolve, reject) => {
        tableTemplate.count({ where:{ type: type } }).then((res)=>{
            return resolve(res);
        });
    });
}

exports.template_getAllTemp = function (type){
    return tableTemplate.findAll({ where:{ type: 'templates' } })
}

exports.template_getAllItem = function (id){
    return tableTemplate.findAll({ where:{ type: 'items',object_id:id } })
}

exports.item_bulkCreate_fromTemplate = function (data){
    let dataItem = data.map(v => {
        Object.assign(v,{ name: v })
    })

    return new Promise((resolve, reject) => {
        tableTemplate.bulkCreate(data).then((res)=>{
            return resolve(res);
        }).catch((e)=>{
            return reject(e);
        })
    })
}

db.sync({force: false, logging: true}).then(r => {
    console.log("Database: sync success")
}).catch(e => {
    console.error(e.message);
})


exports.cekDB = function () {
    db.authenticate().then(() => {
        console.log('Koneksi ke db terlah berhasil.');
    }).catch(function (err) {
        console.log('Tidak dapat melakukan koneksi ke db: ', err);
    });
}