const express = require('express');
const router = express.Router();
const _pg =require('../services/postgress.service');

const session = require('express-session')
const flash = require('express-flash')

router.use(flash());
router.use(express.json());  
router.use(express.urlencoded()); 

router.use(session({
  secret: 'secret',

  resave: false,

  saveUninitialized: false
}))


// -------- INICIO --------
router.get('/', (req, res) => {
  res.render('InicioIndex.html', {title: "Inicio"});
});

router.get('/Videos', (req, res) => {
  res.render('InicioVideos.html', {title: "Videos"});
});

router.get('/Guia', (req, res) => {
  res.render('InicioGuia.html', {title: "Guia"});
});

router.get('/InicioSesion', (req, res) => {
  res.render('InicioSesion.html', {title: "Inicio Sesion"});
});

router.get('/Registro', (req, res) => {
  res.render('InicioRegistro.html', {title: "Registro"});
});

// -------- Usuario --------

router.get('/Usuario', (req, res) => {
  res.render('UsuarioIndex.html', {title: "Inicio"});
});

router.get('/Usuario/Formalizar', (req, res) => {
  res.render('UsuarioFormalizar.html', {title: "Formalizar"});
});

router.get('/Usuario/RecuperarContra', (req, res) => {
  res.render('UsuarioRecuperarContra.html', {title: "Recuperar Contraseña"});
});

router.get('/Usuario/Videos', (req, res) => {
  res.render('UsuarioVideo.html', {title: "Videos"});
});

router.get('/Usuario/Guia', (req, res) => {
  res.render('UsuarioGuia.html', {title: "Guia"});
});

router.get('/Usuario/Contacto', (req, res) => {
  res.render('UsuarioContacto.html', {title: "Contacto"});
});

// ------- Administrador --------

router.get('/inicioAdmin', (req, res) => {
  res.render('AdminSesion.html', {title: "Inicio admin  "});
});

router.get('/Admin/AgregarAsesor', (req, res) => {
  res.render('AdminAgregarAsesor.html', {title: "Agregar Asesor"});
});

// -------- Asesor --------

router.get('/inicioAsesor', (req, res) => {
  res.render('AsesorSesion.html', {title: "Inicio asesor"});
});





router.get('/Admin/ListaAsesor', async (req, res) =>{
  let sql = `SELECT * FROM asesor`;
  let response_db = await _pg.execute(sql);
  let results = response_db.rows;
  res.render('AdminListaAsesor.html', {results: results});
});

router.get('/Admin/ELiminarAsesor/:cedula', async (req, res) => {

  let cedula = req.params.cedula;
  let sql = `DELETE FROM asesor WHERE cedula ='${cedula}';`
  let response_db = await _pg.execute(sql);
  let row_count = response_db.rowCount;
  row_count == 1 ? true : false,
    res.redirect('/Admin/ListaAsesor');
});

router.post("/Admin/AgregarAsesor", async (req, res) => {
  let {id, name, lastname, email} = req.body;

  let errors = [];
  
  console.log({
    id,
    name,
    lastname,
    email
  });

    if(!name || !lastname || !email){
      errors.push({ message: "Espacio Vacio" });
    }

    if(errors.length > 0){
      res.render('InicioRegistro.html', {errors})
    } else {
      let sql = `INSERT INTO asesor
      (cedula, nombre, apellido, correo, contra)
      VALUES('${id}', '${name}', '${lastname}', '${email}', '${id}');`
    
      await _pg.execute(sql);

      //Envia Informacion a la Base de datos y esperar Respuesta
      req.flash("success_msg", "Asesor Agregado con Exito");
      res.redirect("/Admin/ListaAsesor");
    }
});

router.post("/Registro", async (req, res) => {
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
      res.render('InicioRegistro.html', {errors})
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

router.post("/Usuario/RecuperarContra", async (req, res) => {
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
    res.render('UsuarioRecuperarContra.html', {errors})
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
