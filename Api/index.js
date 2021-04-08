//Archivo Principal de Api

const express = require('express');

const app = express();
app.use(express.json());

//Invocar las Rutas de la Carpeta Routers
const routers = require('./routers/index');
app.use(routers);


// Iniciando el Api 
const port = 3000
app.listen(port, () => {
    console.log(`API node: http://localhost:${port}/`);
});