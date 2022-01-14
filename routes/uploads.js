const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const {loadFile,actualizarImg, actualizarImgCloundinary,mostrarImg} = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');




const router = Router()

router.post('/',validarArchivoSubir, loadFile)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','el id debe de  ser de mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
], actualizarImgCloundinary )
// actualizarImg  )

router.get('/:coleccion/:id',[
    check('id','el id debe de  ser de mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImg)

module.exports = router;