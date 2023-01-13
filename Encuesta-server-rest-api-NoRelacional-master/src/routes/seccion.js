const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postSeccion, getSeccions, editSeccion, deleteSeccion } = require('../controllers/SeccionController');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    validarCampos
], postSeccion);
router.get('/:id', getSeccions);
router.put('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    validarCampos
], editSeccion);
router.delete('/:id', deleteSeccion)

module.exports = router;