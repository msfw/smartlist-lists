const express = require('express');

const listsController = require('./app/controllers/listsController');

const routes = express.Router();

routes.get('/list', listsController.getAll);
routes.get('/list/:listId', listsController.getById);
routes.post('/list/', listsController.create);
routes.put('/list/:listId', listsController.update);
routes.delete('/list/:listId', listsController.delete);

module.exports = routes;