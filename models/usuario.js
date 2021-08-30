
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type:String,
        required: [true, 'Nombre es mandatorio']
    },
    email:{
        type:String,
        required: [true, 'Correo es mandatorio'],
        unique:true
    },
    password:{
        type:String,
        required: [true, 'el password es mandatorio']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required: true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },

})



UsuarioSchema.methods.toJSON = function(){

    const {__v, password,_id, ...usuario} = this.toObject();
    usuario.uid = _id
    return usuario


}


module.exports= model ('Usuario', UsuarioSchema)
