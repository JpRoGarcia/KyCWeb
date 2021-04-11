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

router.get('/Entro', (req, res) => {
  res.render('entro.html', {title: "Inicio Sesion Exitoso", user: "Pedro"});
});

router.post("/Registro", (req, res) => {
  let { id, name, lastname, email, password1, password2, movil, phone } = req.body;

  console.log({id,
    name,
    lastname,
    email,
    password1,
    password2,
    movil,
    phone});

    let errors = []

    if(!name || !lastname || !email || !password1 || !password2 || !movil || !phone){
      errors.push({ mensaje: "Viejo Bruto le quedo un espacion Vacio" });
    }

    if(password1.lenght < 6){
      errors.push({ mensaje: "Viejo Bruto la Contraseña esta muy corta" });
    }

    if(password1 != password2){
      errors.push({ mensaje: "Viejo Bruto las contraseña no coinsiden" });
    }

    if(errors.length > 0){
      res.render("Registro", {errors})
    } else {
      let ContraseñaEncriptada = bcrypt.hash(password1)
    }
});

router.get("/usuarios", userController.getUsers);

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


//Ruta para ver Todos los assesor
router.get("/assesores", assesoresController.getassesores);

//Ruta para Modificar un emprendedor
router.put("/usuarios/:cedula", userController.updateUsers);

//Ruta para Modificar un assesor
router.put("/assesores/:cedula", assesoresController.updateassesores);
*/
module.exports = router; 
