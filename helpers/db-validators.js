const Role = require('../models/role')
const {Usuario, Categoria, Producto} = require('../models')

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

const existeCategoriaPorId = async (id='') =>{
    const existeCategoria = await Categoria.findById(id)
    if ( !existeCategoria){
        throw new Error(`El Id: ${id} no existe en DB`)
    }
}

const existeProductoPorId = async (id='') =>{
    const existeProducto = await Producto.findById(id)
    if ( !existeProducto){
        throw new Error(`El Id: ${id} no existe en DB`)
    }
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}