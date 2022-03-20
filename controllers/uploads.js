const path = require('path')
const fs= require('fs')
const { response } =require('express');
const { subirArchivo } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');
const {Usuario,Producto, Cliente} =require('../models')
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)


const  loadFile =  async(req, res = response) =>{

  
    try {
        
        const nombre= await subirArchivo(req.files,['txt','md','xlsx','csv','pdf','docx','pptx'],'documentos')
        res.json({ nombre })

    } catch (msg) {
        res.status(400).json({msg})
        
    }

  

}

const actualizarImg = async(req, res= response) =>{


    const{ id, coleccion} = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un usuario con el id ${id}`
                })
            }

        break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un producto con el id ${id}`
                })
            }

        break;
        case 'clientes':
            modelo = await Cliente.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un producto con el id ${id}`
                })
            }

        break;
    
        default:
            return res.status(500).json({msg:'Esto no esta validado'})
    }

    //limpiar imagenes previas
    if(modelo.img){
        const pathImagen = path.join(__dirname,'../uploads', coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }

    const nombre= await subirArchivo(req.files,undefined,coleccion)
    modelo.img = nombre

    await modelo.save()



    res.json(modelo)

}


const mostrarImg = async (req, res = response) =>{

    const{ id, coleccion} = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un usuario con el id ${id}`
                })
            }

        break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un producto con el id ${id}`
                })
            }

        break;
        case 'clientes':
            modelo = await Cliente.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un cliente con el id ${id}`
                })
            }

        break;
    
        default:
            return res.status(500).json({msg:'Esto no esta validado'})
    }

    //limpiar imagenes previas
    if(modelo.img){
        const pathImagen = path.join(__dirname,'../uploads', coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImagen)


}



const actualizarImgCloundinary = async(req, res= response) =>{


    const{ id, coleccion} = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un usuario con el id ${id}`
                })
            }

        break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un producto con el id ${id}`
                })
            }

        break;
        case 'clientes':
            modelo = await Cliente.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un cliente con el id ${id}`
                })
            }

        break;
    
        default:
            return res.status(500).json({msg:'Esto no esta validado'})
    }

    //limpiar imagenes previas
    if(modelo.img){
        const nombArr = modelo.img.split('/');
        const nombre = nombArr[nombArr.length -1]
        const[ public_id ]  = nombre.split('.')
        cloudinary.uploader.destroy(public_id)

    }

    const { tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath)

    modelo.img = secure_url

    await modelo.save()



    res.json(modelo)

}


module.exports= {
    loadFile,
    actualizarImg,
    mostrarImg,
    actualizarImgCloundinary
}
