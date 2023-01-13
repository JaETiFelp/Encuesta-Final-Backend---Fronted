const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postEncuestaAplicada, getEncuestasAplicadas, getResultadosPr } = require('../controllers/EncuestaAplicadaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getEncuestasAplicadas);
router.post('/resultados',[
    check('id_encuesta', 'El campo id_encuesta es obligatorio').not().isEmpty(),
    check('id_pregunta', 'El campo id_pregunta es obligatorio').not().isEmpty(),
    validarCampos
], getResultadosPr);
router.post('/', [
    check('answers', 'El campo tipoPregunta es obligatorio').not().isEmpty(),
    validarCampos
], postEncuestaAplicada);

module.exports = router;