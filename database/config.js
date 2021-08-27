const mongoose = require('mongoose');




const dbConnection = async()=>{

    try{

        await mongoose.connect(process.env.MONGODB_CNN, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log('Se conecto a la DB')

    }catch(error){

        console.log(error);
        throw new Error('Error con la conexion a DB');
    }


}







module.exports = {
    dbConnection
}