const { response } = require("express");
const { Cliente} = require('../models')



const obtenerClientes  = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const estadoQuery = { estado:true}

    const [total, clientes ] = await Promise.all([
        Cliente.countDocuments(estadoQuery),
        Cliente.find(estadoQuery)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        clientes
    });



}
 
const obtenerCliente = async(req, res = response) =>{
    const { id } = req.params;
    const cliente = await Cliente.findById(id)
                            .populate('usuario','nombre')
                            .populate('categoria','nombre');

    res.json(cliente)
}


const crearCliente = async (req, res = response) =>{

    const {estado, usuario,...body} = req.body;

    const clienteDB = await Cliente.findOne({ nombre: body.nombre});

    if( clienteDB) {
        return res.status(400).json({
            msg: `el cliente ${ clienteDB.nombre}, ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const cliente = new Cliente( data )
    await cliente.save();

    res.status(201).json(cliente);
}

const actualizarCliente = async(req, res = response) =>{

    const { id } = req.params;
    const { estado, usuario , ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const cliente = await Cliente.findByIdAndUpdate(id,data, { new: true})
    res.json(cliente)

}

const borrarCliente = async(req, res = response) =>{
    
    const { id } = req.params;  
    const clienteBorrado = await Cliente.findByIdAndUpdate(id, {estado: false}, {new:true})

    res.json(clienteBorrado)



}



module.exports= {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    borrarCliente
}