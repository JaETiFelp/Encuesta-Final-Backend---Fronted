const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postEncuesta, getEncuestas, getEncuesta, editEncuesta, deleteEncuesta, getEncuestasW, getEncuestasWeb, getEncuestaWeb, changeState} = require('../controllers/EncuestaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getEncuestas);
router.get('/w', getEncuestasW);
router.get('/:id', getEncuesta);

router.get('/web/w', getEncuestasWeb);
router.get('/web/:id', getEncuestaWeb);
router.put('/web/:id',[
    check('state', 'El campo state es obligatorio').not().isEmpty(),
    validarCampos
], changeState);

router.delete('/:id', deleteEncuesta);
router.post('/', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('description', 'El campo description es obligatorio').not().isEmpty(),
    check('nro_veces', 'El campo description es obligatorio').not().isEmpty(),
    check('fecha_vigencia', 'El campo description es obligatorio').not().isEmpty(),
    validarCampos
], postEncuesta);

router.put('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('description', 'El campo description es obligatorio').not().isEmpty(),
    check('nro_veces', 'El campo description es obligatorio').not().isEmpty(),
    check('fecha_vigencia', 'El campo description es obligatorio').not().isEmpty(),
    validarCampos
], editEncuesta);

module.exports = router;