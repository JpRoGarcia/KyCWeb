const express = require('express');
const router = express.Router();
const userController = require("../controllers/emprendedor.controller")


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
  res.render('InicioSesion.html', {title: "Inicio Sesion"});
});

router.get('/Registro', (req, res) => {
  res.render('Registrar.html', {title: "Registro"});
});
/*
//Ruta para la creacion de Usuarios
router.post("/usuarios", userController.saveUsers);

//Ruta para eliminar un Usuario
router.delete("/usuarios/:cedula", userController.deleteUsers);

//Ruta para ver Todos los Usuarios
router.get("/usuarios", userController.getUsers);

//Ruta para Modificar un Usuario
router.put("/usuarios/:cedula", userController.updateUsers);
*/
module.exports = router; 
