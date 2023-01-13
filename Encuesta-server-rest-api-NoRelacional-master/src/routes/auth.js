const { Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { login, register} = require('../controllers/AuthController');

router.post('/login', [
    check('correo', 'correo no valido').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);
router.post('/register',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('genero', 'El genero es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña no es valida').not().isEmpty(),
    validarCampos
], register);

module.exports = router;

