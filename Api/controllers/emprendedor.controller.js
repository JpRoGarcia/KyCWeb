const _pg=require('../services/postgress.service');

//Obtener y Mostrar Todos los Usuarios de la Base de Datos
const getUsers = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Recolectar los Usuarios
        let sql = `SELECT * FROM emprendedores`;


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
const saveUsers = async (req, res) => {
    try {
        //Guardar la Informacion y Conectar con la Base de Datos
        let user = req.body;
        let sql = `INSERT INTO emprendedores
        (cedula, nonbre, apellido, correo, contra, confirmarcontra, celular, telefono)
        VALUES('${user.cedula}', '${user.nonbre}', '${user.apellido}', '${user.correo}', '${user.contra}', '${user.confirmarcontra}', '${user.celular}', '${user.telefono}');`
      
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
const deleteUsers = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Mediante la ID eliminar el Usuario
        let cedula = req.params.cedula;
        let sql = `DELETE FROM emprendedores
        WHERE cedula='${cedula}'`;

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
const updateUsers = async (req, res) => {
    try { 
        //Conectar con la Base de Datos y Recoger la Informacion para Actualizar
        let cedula = req.params.cedula;
        let user = req.body;
        let sql = `UPDATE emprendedores
        SET correo='${user.correo}', contra='${user.contra}', confirmarcontra='${user.confirmarcontra}', celular='${user.celular}', telefono='${user.telefono}'
        WHERE cedula='${cedula}'`;

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
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


module.exports = { getUsers, saveUsers, deleteUsers, updateUsers };
