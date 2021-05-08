const _pg =require('../services/postgress.service');

//Obtener y Mostrar Todos los Usuarios de la Base de Datos
const getinquietud = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Recolectar los Usuarios
        let sql = `SELECT * FROM inquietud`;


        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let rows = response_db.rows;

        //Envia una Alerta
        return res.send(rows);
    } catch (error) {
        //Envia una Alerta
        return res.send(error);
    }
}

//Guardar Nuevos Usuarios en la Base de Datos
const saveinquietud = async (req, res) => {
    try {
        //Guardar la Informacion y Conectar con la Base de Datos
        let user = req.body;
        let sql = `INSERT INTO inquietud
        (id, idempresario, correo, asunto, mensaje)
        VALUES('${user.id}', '${user.idempresario}', '${user.correo}', '${user.asunto}', '${user.mensaje}');
         `
      
        //Envia Informacion a la Base de datos y esperar Respuesta
        await _pg.execute(sql);

        //Envia una Alerta
        return res.send({
            ok: true,
            message: "Usuario creado",
            info: user,
        });
    } catch (error) {
        //Envia una Alerta
        return res.send({
            ok: false,
            message: "El Usuario ya se Encuentra Registrado",
            info: error,
    });
    }
}

//Eliminar Usuario de la Base de Datos
const deleteinquietud = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Mediante la ID eliminar el Usuario
        let id = req.params.id;
        let sql = `DELETE FROM inquietud
        WHERE id='${id}';`

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let row_count = response_db.rowCount;

        //Envia una Alerta
        return res.send({
            ok: row_count == 1 ? true : false,
            message: "Usuario Eliminado",
            info: id,
        });
       } catch (error) {
        //Envia una Alerta
        return res.send({
          ok: false,
          message: "El Usuario No se Encuentra Registrado",
          info: error,
        });
    }  
}

//Actualizar la Informacion del Usuario(Rol Favorito y Arma Favorita)
const updateinquietud = async (req, res) => {
    try { 
        //Conectar con la Base de Datos y Recoger la Informacion para Actualizar
        let id = req.params.id;
        let user = req.body;
        let sql = `UPDATE inquietud
        SET  correo='${user.correo}', asunto='${user.asunto}', mensaje='${user.mensaje}'
        WHERE id='${id}';`

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let row_count = response_db.rowCount;

      //Envia una Alerta
      return res.send({
        ok: row_count == 1 ? true : false,
        message: "Usuario Actualizado",
        info: id,
      });
    } catch (error) {
        //Envia una Alerta
        return res.send({
            ok: false,
            message: "El Usuario No se Encuentra Registrado",
            info: error,
        });
    }
};


module.exports = { getinquietud, saveinquietud, deleteinquietud, updateinquietud };
