const express = require('express');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentsController');
const profileController = require('./controllers/ProfileController');
const sectionController = require('./controllers/SectionController');

const routes = express.Router();

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', profileController.index);


// ESSE COMENTÁRIO FOI ADICIONADO PARA MUDAR ALGUMA COIS AANTES DE IR AO GIT

routes.post('/section', sectionController.create);

module.exports = routes;