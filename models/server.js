const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload')


class Server{

    

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:'/api/auth',
            buscar:'/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            clientes: '/api/clientes',
            usuarios:'/api/usuarios',
            uploads:'/api/uploads'

        }


        //conexDB
        this.conectarDB();


        //middlewares
        this.middlewares();

        //routes
        this. routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use( cors())
        this.app.options('*', cors());

        //esto se puede borrar
        this.app.use((req,res, next)=>{
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader(  
                "Access-Control-Allow-Headers",  
                "Origin, X-Requested-With, Content-Type, Accept");  
            res.setHeader("Access-Control-Allow-Methods",  
            "GET, POST, PATCH, DELETE, OPTIONS");
            res.setHeader("Authorization","Bearer");  
            next();
        })               
        //read and parse
        this.app.use( express.json() )

        this.app.use(express.static('public') );

        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){   

        this.app.use(this.paths.auth, require('../routes/auth') )
        this.app.use(this.paths.buscar, require('../routes/buscar') )
        this.app.use(this.paths.categorias, require('../routes/categorias') )
        this.app.use(this.paths.productos, require('../routes/productos') )
        this.app.use(this.paths.clientes, require('../routes/clientes') )
        this.app.use(this.paths.usuarios, require('../routes/usuarios') )
        this.app.use(this.paths.uploads, require('../routes/uploads') )
        
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port)
        })
    }

}

module.exports = Server;