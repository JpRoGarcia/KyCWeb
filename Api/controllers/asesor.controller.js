const _pg =require('../services/postgress.service');

//Obtener y Mostrar Todos los Usuarios de la Base de Datos
const getasesor = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Recolectar los Usuarios
        let sql = `SELECT * FROM asesor`;
        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let rows = response_db.rows;
        //Envia una Alerta
        console.log("Probando Rows", rows)
        return res.send(rows);
    } catch (error) {
        //Envia una Alerta
        return res.send(error);
    }
}

//Guardar Nuevos Usuarios en la Base de Datos
const saveasesor = async (req, res) => {
    try {
        //Guardar la Informacion y Conectar con la Base de Datos
        let user = req.body;
        let sql = `INSERT INTO asesor
        (cedula, nombre, apellido, correo, contra)
        VALUES('${user.cedula}', '${user.nombre}', '${user.apellido}', '${user.correo}', '${user.contra}'');`
      
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
const deleteasesor = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Mediante la ID eliminar el Usuario
        let cedula = req.params.cedula;
        let sql = `DELETE FROM asesor
        WHERE cedula ='${cedula}';`

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let row_count = response_db.rowCount;

        //Envia una Alerta
        return res.send({
            ok: row_count == 1 ? true : false,
            message: "Usuario Eliminado",
            info: cedula,
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
const updateasesor = async (req, res) => {
    try { 
        //Conectar con la Base de Datos y Recoger la Informacion para Actualizar
        let cedula = req.params.cedula;
        let user = req.body;
        let sql = `UPDATE asesor
        SET nombre='${user.nombre}', apellido='${user.apellido}', correo='${user.correo}', contra='${user.contra}, '
        WHERE cedula='${user.cedula}'';`

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await ab.execute(sql);
        let row_count = response_db.rowCount;

      //Envia una Alerta
      return res.send({
        ok: row_count == 1 ? true : false,
        message: "Usuario Actualizado",
        info: cedula,
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


module.exports = { getasesor, saveasesor, deleteasesor, updateasesor};
