const express = require('express');
const router = express.Router();
//const userController = require("../controllers/emprendedor.controller")


router.get('/', (req, res) => {
  res.render('index.html', {title: "Inicio"});
});

router.get('/Formalizar', (req, res) => {
  res.render('formalizar.html', {title: "Formalizar"});
});

router.get('/Videos', (req, res) => {
  res.render('videos.html', {title: "Videos"});
});

router.get('/Guia', (req, res) => {
  res.render('guia.html', {title: "Guia"});
});

router.get('/Contacto', (req, res) => {
  res.render('contact.html', {title: "Contacto"});
});


//router.get("/usuarios", userController.getUsers);

module.exports = router; 