const Role = require('../models/role')
const {Usuario, Categoria, Producto, Cliente} = require('../models')

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

const existeClientePorId = async (id='') =>{
    const existeCliente = await Cliente.findById(id)
    if ( !existeCliente){
        throw new Error(`El Id: ${id} no existe en DB`)
    }
}

//validas colecciones permitidas

const coleccionesPermitidas =(coleccion='', colecciones=[])=>{

    const incluida = colecciones.includes(coleccion)
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, las siguientes si: ${colecciones}`)
    }

    return true
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas,
    existeClientePorId
}