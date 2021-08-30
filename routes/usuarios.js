

const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    isAdminRole,
    perRole
} = require('../middlewares')


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');



const router = Router()

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre','nombre no es valido').not().isEmpty(),
    check('password','el password debe ser sobre 8 caracteres').isLength({ min:8}),
    check('email').custom(emailExiste),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    // isAdminRole, obliga a ser administrador para poder ejecutarse
    perRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);






module.exports = router;
