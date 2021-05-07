const express = require('express');
const session = require('express-session')
const flash = require('express-flash')

const router = express.Router();
const _pg =require('../services/postgress.service');
const passport = require("passport")

router.use(flash());
router.use(express.json());  
router.use(express.urlencoded()); 
router.use(passport.initialize())
router.use(passport.session())

router.use(session({
  secret: 'secret',

  resave: false,

  saveUninitialized: false
}))



router.get('/', (req, res) => {
  res.render('index.html', {title: "Inicio"});
});

router.get('/I', (req, res) => {
  res.render('index2.html', {title: "Inicio"});
});

router.get('/RecuperarContra', (req, res) => {
  res.render('RecuperarContra.html', {title: "Recuperar Contraseña"});
});


router.get('/Formalizar', (req, res) => {
  res.render('formalizar.html', {title: "Formalizar"});
});

router.get('/Videos', (req, res) => {
  res.render('videos.html', {title: "Videos"});
});

router.get('/VideosI', (req, res) => {
  res.render('videos2.html', {title: "Videos"});
});

router.get('/Guia', (req, res) => {
  res.render('guia.html', {title: "Guia"});
});

router.get('/GuiaI', (req, res) => {
  res.render('guia2.html', {title: "Guia"});
});

router.get('/Contacto', (req, res) => {
  res.render('contact.html', {title: "Contacto"});
});

router.get('/InicioSesion', (req, res) => {
  res.render('iniciosesion.html', {title: "Inicio Sesion"});
});




router.get('/pe', (req, res) => {
  res.render('asesor.html', {title: "asesor"});
});
router.get('/listasesores', (req, res) => {
  res.render('listasesores.html', {title: "listasesores"});
});





router.get('/Emprendedor/Registro', (req, res) => {
  res.render('registro.html', {title: "Registro"});
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
      errors.push({ message: "Espacio Vacio" });
    }

    if (password1.length < 6) {
      errors.push({ message: "La Contraseña es muy Corta" });
    }

    if (password1 !== password2) {
      errors.push({ message: "Las Contraseñas no Coinciden" });
    }

    if(errors.length > 0){
      res.render('registro.html', {errors})
    } else {
      let sql = `INSERT INTO emprendedor
      (cedula, nombre, apellido, correo, contra, celular, telefono)
      VALUES('${id}', '${name}', '${lastname}', '${email}', '${password1}', 
       '${movil}', '${phone}');`
    
      await _pg.execute(sql);

      //Envia Informacion a la Base de datos y esperar Respuesta
      req.flash("success_msg", "Registro con Éxito, Por Favor Inicia Sesión");
      res.redirect("/InicioSesion");
    }
});

router.post("/InicioSesion", async (req, res) => {
  let {  emaili, passwordi } = req.body;
  let errors = [];

  console.log({
    emaili,
    passwordi,
  });

  if( !emaili || !passwordi ){
    errors.push({ message: "Espacio Vacío" });
  }

  if(errors.length > 0){
    res.render('InicioSesion.html', {errors})
  } else {
    //let sql = `SELECT contra FROM emprendedores WHERE="${emaili}"`

    let sql = `SELECT * FROM emprendedor
    WHERE correo='${emaili}' and contra='${passwordi}';`
    let response_db = await _pg.execute(sql);
    let rows = response_db.rows;
    let validar = rows.length;
    if(validar == 1){
      res.redirect("/I");
    }else{
      errors.push({ message: "La Contraseña o Correo son Incorrectos" });
      res.render('InicioSesion.html', {errors})
    }
  }
});

router.post("/RecuperarContra", async (req, res) => {
  let {  emailc, password1c, password2c } = req.body;
  let errors = [];

  console.log({
    emailc,
    password1c,
    password2c,
  });

  if (password1c.length < 6) {
    errors.push({ message: "La Contraseña es muy corta" });
  }

  if (password1c !== password2c) {
    errors.push({ message: "Las Contraseñas no Coinciden" });
  }

  if(errors.length > 0){
    res.render('RecuperarContra.html', {errors})
  } else {
      let sqlCorreo = `SELECT * FROM emprendedor
      WHERE correo='${emailc}';`
      let response_db = await _pg.execute(sqlCorreo);
      let rows = response_db.rows;
      let validar = rows.length;
      if(validar == 1){
        let sql = `UPDATE emprendedor
        SET contra='${password1c}'
        WHERE correo='${emailc}'`;

        await _pg.execute(sql);

        req.flash("success_msg", "Contraseña Restaurada, Por favor Inicia Sesión");
        res.redirect("/InicioSesion");

      }else{
        errors.push({ message: "El Correo no Existe" });
        res.render('RecuperarContra.html', {errors})
      }
  }
})

module.exports = router; 
