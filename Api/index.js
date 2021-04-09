const express = require('express');

const app = express();
app.use(express.json());

//Invocar las Rutas de la Carpeta Routers
const routers = require('./routers/index');
app.use(routers);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando el Api 
const port = 3000
app.listen(port, () => {
    console.log(`API node: http://localhost:${port}/`);
});