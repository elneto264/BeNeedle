const { Schema, model} =require('mongoose');

const ClienteSchema = Schema({

    nombre:{
        type:String,
        required:[true, 'El nombre es mandatorio'],
        unique: true
    },

    estado:{
        type:Boolean,
        default:true,
        required:true
    },

    usuario:{
        type: Schema.Types.ObjectID,
        ref: 'Usuario',
        required: true
    },
    
    precio:{
        type: Number,
        default:0
    },
    categoria:{
        type: Schema.Types.ObjectID,
        ref:'Categoria',
        required:true
    },
    email:{
        type:String,
        required: [true, 'Correo es mandatorio'],
        unique:true
    },
    descripcion: { type: String},
    disponible: { type: Boolean, default:true},
    cuantia:{type:Number, default:0},
    img:{type: String},
    instagram:{type:String},
    telefono:{type:String},
    duracion:{type:String},
    tamanio:{type:String},
    otros:{type:String},
    fecha:{type:Date}


})

//nombre,precio,imagen,cuantia

ClienteSchema.methods.toJSON = function(){

    const {__v, estado, ...data} = this.toObject();
    return data


}

module.exports = model('Cliente', ClienteSchema)