const { response, request} = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {


    const {limite = 5, desde = 0} = req.query;
    const estadoQuery = { estado:true}
    // const usuarios = await Usuario.find(estadoQuery)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(estadoQuery);

    //esta version es mucha más rapido
    const [total, usuarios ] = await Promise.all([
        Usuario.countDocuments(estadoQuery),
        Usuario.find(estadoQuery)
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const {id } = req.params;
    const {_id, password, google, ...resto} = req.body;

    // validar con db
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
}


const usuariosPost = async (req, res = response) => {


    const { nombre, email, password, rol} = req.body;
    const usuario = new Usuario({ nombre, email, password, rol})

    //encryptado
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //borrado permanente [ESTE SOLO SI NO QUEREMOS QUE EXISTAS]
    // const usuario = await Usuario.findByIdAndDelete(id);

    //este mantiene la integridad referencial 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});



    res.json({
        usuario
    });
}


const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controller'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}