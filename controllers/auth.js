const bcryptjs = require('bcryptjs');
const { response } = require('express');

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignin = async (req, res=response)=>{


    const { id_token } = req.body;



    try{

        const {email, nombre, img}= await googleVerify(id_token)

        let usuario = await Usuario.findOne({ email })
        if( !usuario){
            const data = {
                nombre,
                email,
                password:'123',
                img,
                google: true
            }
            usuario= new Usuario(data)
            await usuario.save()
        }

        if( !usuario.estado){
            return res.status(400).json({
                msg: 'Contacte con su admin, usuario bloqueado'
            })
        }

        const token = await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        })

    } catch(error){
        res.status(400).json({
            msg:'Token de google no es valido'
        })
    }

   
    

}

module.exports = {
    login,
    googleSignin
}