const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

//Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.use(express.json());
app.use(morgan('dev'))

// Routers
const routers = require('./routers/index.js');
app.use(routers);

//prueba jessica
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))

// Iniciando el Api 
const port = 3000
app.listen(port, () => {
    console.log(`API node: http://localhost:${port}/`);
});

