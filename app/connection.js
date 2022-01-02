'use strict';

const Sequelize = require('sequelize');

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