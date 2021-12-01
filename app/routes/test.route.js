const app = require('express').Router();
const routes = require('../controller/test.controller');
let { agencyCreateSchema ,agencyUpdate} = require('../validator/agency.validator')
let { validateToken } = require('../helper/jwt')

app.post('/register', agencyCreateSchema, routes.register)
app.put('/update/:clientId',[agencyUpdate, validateToken], routes.updateClient)
app.get('/client', routes.getData)
module.exports = app;
