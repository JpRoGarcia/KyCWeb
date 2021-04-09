const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {title: "Wenas Perro"});
});

router.get('/Contact', (req, res) => {
  res.render('contact', {title: "Contacto COntactudo"});
});

module.exports = router; 