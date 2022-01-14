const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  perRole  = require('../middlewares/validar-roles');
const  validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...perRole,
    ...validarArchivoSubir,
}