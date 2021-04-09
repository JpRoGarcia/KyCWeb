const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html', {title: "Wenas Perro"});
});

router.get('/Contact', (req, res) => {
  res.render('contact.html', {title: "Contacto COntactudo"});
});

module.exports = router; 