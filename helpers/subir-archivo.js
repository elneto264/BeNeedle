const path = require('path')
const { v4: uuidv4 } = require('uuid');


const subirArchivo = (files, extensionesValidas=['png','jpg','jpeg','gif','heic'], carpeta='') =>{

    return new Promise((resolve, reject)=>{

        const{archivo} = files;
        const nombreCorto = archivo.name.split('.')
        const extension = nombreCorto[nombreCorto.length - 1]
        console.log(nombreCorto)
    
        //validar extension
    
        if(!extensionesValidas.includes(extension)){
            
            return reject(`La extension ${extension} no es permitida, las siguientes si: ${ extensionesValidas}`)
        }
    
        const nomUnico = uuidv4()+ '.'+ extension
      
        uploadPath = path.join(__dirname , '../uploads/' , carpeta, nomUnico );
      
        archivo.mv(uploadPath, (err)=> {
          if (err) {
            
            reject(err)
          }
      
          resolve(nomUnico)
        });


    })




}


module.exports = {
    subirArchivo
}