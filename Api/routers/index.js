const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const App = express();
const userController = require("../controllers/emprendedor.controller")
const assesoresController = require("../controllers/assesores.controller");
const { Pool, Query } = require("pg");
const { query } = require("express");
router.use(express.json());  
router.use(express.urlencoded()); 

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

router.get('/InicioSesion', (req, res) => {
  res.render('iniciosesion.html', {title: "Inicio Sesion"});
});

router.get('/Emprendedor/Registro', (req, res) => {
  res.render('registro.html', {title: "Registro"});
});

router.get('/Entro', (req, res) => {
  res.render('entro.html', {title: "Inicio Sesion Exitoso", user: "Pedro"});
});

router.post("/Emprendedor/Registro", async (req, res) => {
  let { id, name, lastname, email, password1, password2, movil, phone } = req.body;

  let errors = [];
  
  console.log({
    id,
    name,
    lastname,
    email,
    password1,
    password2,
    movil,
    phone
  });

    if(!name || !lastname || !email || !password1 || !password2 || !movil || !phone){
      errors.push({ message: "Viejo Bruto le quedo un espacion Vacio" });
    }

    if (password1.length < 6) {
      errors.push({ message: "Viejo Bruto la Contraseña esta muy corta" });
    }

    if (password1 !== password2) {
      errors.push({ message: "Viejo Bruto las contraseña no coinsiden" });
    }

    if(errors.length > 0){
      res.render('/Emprendedor/Registro', {errors})
    } else {
      let ContraseñaEncriptada = await bcrypt.hash(password1, 10)
      console.log(ContraseñaEncriptada);

    }

});

module.exports = router; 
