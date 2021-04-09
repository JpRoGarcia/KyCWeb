const express = require('express');
const router = express.Router();
const userController = require("../controllers/emprendedor.controller")


/*router.get('/', (req, res) => {
  res.render('index.html', {title: "Wenas Perro"});
});

router.get('/Contact', (req, res) => {
  res.render('contact.html', {title: "Contacto COntactudo"});
});*/

router.get("/usuarios", userController.getUsers);

module.exports = router; 