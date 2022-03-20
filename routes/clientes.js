const { Router } = require('express');
const { check } = require('express-validator');
const { crearCliente, 
        obtenerClientes,
        obtenerCliente, 
        actualizarCliente,
        borrarCliente } = require('../controllers/clientes')
const { existeCategoriaPorId, existeClientePorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, isAdminRole,  } = require('../middlewares');

const router = Router()

router.get('/', obtenerClientes)


router.get('/:id',[
    check('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeClientePorId ),
    validarCampos
],obtenerCliente)


router.post('/',[
    validarJWT,
    check('nombre','El nombre es mandatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearCliente)


router.put('/:id', [
    validarJWT,
    check('categoria','No es un id de mongo').isMongoId(),
    check('id').custom(existeClientePorId ),
    validarCampos
],actualizarCliente)

router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeClientePorId ),
    validarCampos
], borrarCliente)
module.exports = router;