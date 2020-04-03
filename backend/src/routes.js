const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentsController');
const profileController = require('./controllers/ProfileController');
const sectionController = require('./controllers/SectionController');

const routes = express.Router();

routes.post('/section', sectionController.create);

routes.get('/ongs', ongController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);
 
routes.post('/incidents', incidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),incidentController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);

module.exports = routes;