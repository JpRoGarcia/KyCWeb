const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

//Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json());
app.use(morgan('dev'))

// Routers
const routers = require('./routers/');
app.use(routers);

// Iniciando el Api 
const port = 3000
app.listen(port, () => {
    console.log(`API node: http://localhost:${port}/`);
});