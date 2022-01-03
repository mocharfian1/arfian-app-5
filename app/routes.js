'use strict';

module.exports = function(app) {

    var homeController = require('./controllers/homeController');
    var checklistsController = require('./controllers/checklistsController');
    var templateController = require('./controllers/templateController');

    app.route('/').get(homeController.index);

    //------ TEMPLATES -------
    app.route('/checklists/templates').post(templateController.createChecklistTemplate);
    app.route('/checklists/templates').get(templateController.getListAllTemplates);
};