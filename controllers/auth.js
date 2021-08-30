const bcryptjs = require('bcryptjs');
const { response } = require('express');

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')


const login = async (req, res = response) =>{

    const { email, password} = req.body;

    try{

        //Verificar si existe el email
        const usuario = await Usuario.findOne({email})
        if (!usuario){
            return res.status(400).json({
                msg:'Usuario/ Password no son correctos - email'
            })
        }

        //verificar si el user esta activo
        if ( !usuario.estado){
            return res.status(400).json({
                msg:'Usuario/ Password no son correctos - estado: false'
            })
        }
        
        //Verificar pass
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/ Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg:'Contacta con el admin'
        })

    }


}

module.exports = {
    login
}