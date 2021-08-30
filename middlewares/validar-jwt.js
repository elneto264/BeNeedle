const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')


const validarJWT = async (req = request , res = response, next) =>{


    const token = req.header('x-token')
    if (!token){
        return res.status(401).json({
            msg: 'falta el token'
        })
    }

    try{

        const {uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //lee el user que corresponde al uid
        const usuario = await Usuario.findById( uid)

        if(!usuario){
            return res.status(401).json({
                msg: 'usuario no exite en DB'
            })
        }

        //verifica si el uid es en estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no valido'
            })
        }




        req.usuario = usuario
        next()

    } catch(error){
        console.log(error)
        res.status(401).json({
            msg:'Token no vale'
        })
    }

}



module.exports = {
    validarJWT
}