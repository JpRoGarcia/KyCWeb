const express = require('express');
const router = express.Router();
const userController = require("../controllers/emprendedor.controller")
const assesoresController = require("../controllers/assesores.controller")

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

router.get('/Registro', (req, res) => {
  res.render('registro.html', {title: "Registro"});
});
/*
//Ruta para la creacion de emprendedor
router.post("/usuarios", userController.saveUsers);

//Ruta para la creacion de assesores
router.post("/assesores", assesoresController.saveassesores);

//Ruta para eliminar un emprendedor
router.delete("/usuarios/:cedula", userController.deleteUsers);

//Ruta para eliminar un assesores
router.delete("/assesores/:cedula", assesoresController.deleteassesores);

//Ruta para ver Todos los emprendedor
router.get("/usuarios", userController.getUsers);

//Ruta para ver Todos los assesor
router.get("/assesores", assesoresController.getassesores);

//Ruta para Modificar un emprendedor
router.put("/usuarios/:cedula", userController.updateUsers);

//Ruta para Modificar un assesor
router.put("/assesores/:cedula", assesoresController.updateassesores);
*/
module.exports = router; 
