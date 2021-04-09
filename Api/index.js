const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(express.json());
app.use(morgan('dev'))

// Routers
//const routers = require('./routers/index');
//app.use(routers);

app.get('/', (req, res) => {
    res.sendDate(path.join(__dirname, views));
});

// middlewares
// static files
// Iniciando el Api 
const port = 3000
app.listen(port, () => {
    console.log(`API node: http://localhost:${port}/`);
});