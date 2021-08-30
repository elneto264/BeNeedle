const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router()

router.post('/login', [
    check('email','El email es mandatorio').isEmail(),
    check('password','El password es olbigatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;