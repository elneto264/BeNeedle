const { response } = require("express")


const isAdminRole = (req, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Es necesario verificar el rol sin validar el token primero'
        })
    }


    const { rol, nombre }= req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no tiene permisos`
        })
    }


    next();
}

const perRole = (...roles) =>{
    return (req, res = response, next) =>{

        if(!req.usuario){
            return res.status(500).json({
                msg:'Es necesario verificar el rol sin validar el token primero'
            })
        }

        if( !roles.includes( req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }


        next();
    }
}

module.exports = {
    isAdminRole,
    perRole
}