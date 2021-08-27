const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async (rol='') =>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en DB`)
    }
}


const emailExiste = async (email='') =>{
    const existeEmail = await Usuario.findOne({ email })
    if ( existeEmail){
        throw new Error(`El email: ${email} ya esta registrado en DB`)
    }
}

const existeUsuarioPorId = async (id='') =>{
    const existeUsuario = await Usuario.findById(id)
    if ( !existeUsuario){
        throw new Error(`El Id: ${id} no existe en DB`)
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}