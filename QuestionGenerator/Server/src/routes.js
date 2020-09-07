const { Router } = require('express');
const QuestionController = require('./app/controllers/QuestionController');
const TestController = require('./app/controllers/TestController');
const LoginController = require('./app/controllers/LoginController');
const UserController = require('./app/controllers/UserController');
const TestAvailableController = require('./app/controllers/TestAvailableController');

const routes = Router();

routes.post('/questions', QuestionController.store);
routes.delete('/questions', QuestionController.delete);
routes.get('/questions/:id', QuestionController.index);
routes.get('/questions/', QuestionController.index);
routes.put('/questions/', QuestionController.edit);
routes.post('/tests', TestController.store);
routes.put('/tests', TestController.edit);
routes.delete('/tests', TestController.delete);
routes.get('/tests/:id', TestController.index);
routes.get('/tests/', TestController.index);
routes.post('/login', LoginController.Authenticate);
routes.post('/user', UserController.store);
routes.get('/testavailable/', TestAvailableController.index);
routes.get('/testrun/', TestAvailableController.getAll);
routes.post('/testavailable', TestAvailableController.store);

module.exports = routes;