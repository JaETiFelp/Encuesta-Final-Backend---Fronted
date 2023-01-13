const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postTipoPregunta, getTipoPreguntas, getTipoPregunta} = require('../controllers/TipoPregunta');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getTipoPreguntas);
router.get('/:id', getTipoPregunta);
router.post('/', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('type', 'El campo description es obligatorio').not().isEmpty(),
    validarCampos
], postTipoPregunta);

module.exports = router;