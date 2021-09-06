const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router()

router.post('/login', [
    check('email','El email es mandatorio').isEmail(),
    check('password','El password es olbigatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token','El id_toke es mandatorio').not().isEmpty(),
    validarCampos
], googleSignin);


module.exports = router;