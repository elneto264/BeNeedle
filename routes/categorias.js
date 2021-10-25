const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCategorias,
        obtenerCategoria, 
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, isAdminRole,  } = require('../middlewares');

const router = Router()

router.get('/', obtenerCategorias)


router.get('/:id',[
    check('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId ),
    validarCampos
],obtenerCategoria)


router.post('/',[
    validarJWT,
    check('nombre','El nombre es mandatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//me quede en la parte de crear el update y delete, no se ha hecho nada raro
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es mandatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId ),
    validarCampos
],actualizarCategoria)

router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId ),
    validarCampos
], borrarCategoria)
module.exports = router;