const { generarJWT } = require('../helpers/generar-jwt');
const { User } = require('../models/User');
const bcryptjs = require('bcryptjs');


const register = async (req, res) =>{

    const { nombre, telefono, correo, direccion, genero, contrasena } = req.body;
    const user = new User( { nombre, telefono, correo, direccion, genero, contrasena } );

    //verificar que el correo exista
    const existemail = await User.findOne( { correo: correo });
    if ( existemail ){
        return res.status(400).json({ success: false, message: 'correo ya registrado'});
    }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.contrasena = bcryptjs.hashSync(contrasena, salt );
    //guardar db
    await user.save();
    res.status(200).json({
        success: true, message: 'User agregado!'
    });  
}

const login = async (req, res) => {
    const { correo , contrasena } = req.body;
    try {
        const user = await User.findOne({ correo: correo });
        if ( !user ){
            return res.status(400).json({
                success: false, message: 'El correo no es valido'
            })
        }

        const validarContrasena = bcryptjs.compareSync( contrasena, user.contrasena );
        if ( !validarContrasena ){
            return res.status(400).json({
                success: false, message: 'La contraseña no es valida'
            })
        }

        //Generar el JWT
        const token = await generarJWT(user.id);

        res.status(200).json({
            success: true, token
        });

    } catch (error) {
        return res.status(404).json({
            error
        });
    }
    
};

module.exports = {
    login,
    register
}