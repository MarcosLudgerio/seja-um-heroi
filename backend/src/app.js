const express = require('express');

const { errors } = require('celebrate');

const cors = require('cors');

const app = express();

const routes = require('./routes');

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errors());

module.exports = app


// app.get('/users/', (req, res) =>{
//     // PARAMETROS QUE VEIO DA ROTA cliente, DEPOIS DO (users?chave=valor
//     // const query = req.query;
//     // console.log(query);

//     //PARAMETROS QUE O BACKEND ESPERA, /users/:chave
//     // const params = req.params;
//     // console.log(params);
    
//     // PARAMETROS QUE VEIO PELO CORPO DA REQUISIÇÃO, VIA JSON
//     // const body = req.body;
//     // console.log(body);

//     return res.json({
//         messagem: "Acho que não funciona"
//     });
// });