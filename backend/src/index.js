const express = require('express');

const cors = require('cors');

const app = express();

const routes = require('./routes');

app.use(express.json());

app.use(routes);

app.use(cors());

app.listen(3636, () => {
    console.log("Sempre no final da merda!")
});




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