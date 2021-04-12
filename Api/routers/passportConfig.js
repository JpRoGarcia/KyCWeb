const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport) {
    const authenticateUser = (email, password, done) =>{
        `SELECT * FROM emprendedores WHERE correo = $1`, [email], 
        (err, results) => {
            if(err){
                throw err;
            }

            console.log(results.rows);

            if(results.rows.length > 0){
                const user = results.rows[0];

                bcrypt.compare(password, user.password, 
                    (err, isMatch) => {
                    if(err){
                        throw err;
                    }
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: "Contraseña Incorrecta"})
                    }
                });
            } else{
                return done(null, false, {message: "Correo no existe"})
            }
        };
    };
    passport.use(   
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            authenticateUser
        )
    );
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        `SELECT * FROM emprendedores WHERE cedula = $1`, [id], (err, results) => {
            if (err) {
              return done(err);
            }
            console.log(`ID is ${results.rows[0].id}`);
            return done(null, results.rows[0]);
        }
    });
}

module.exports = initialize;



 