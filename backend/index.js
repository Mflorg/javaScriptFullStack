
if(process.env.NODE_ENV==='development'){
    require('dotenv').config() //permitira reconocer los archivos .env
}
const express= require('express');
const morgan=require('morgan');
const cors= require('cors');
const multer=require('multer')
const path=require('path')





// Initializations
const app= express()
require('./database')

//middlewares
app.use(morgan('dev')) // --> morgan() da error
const storage=multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'), //configurando el destino
    filename(req, file, cb){
        cb(null,new Date().getTime()+ path.extname(file.originalname)) //path.extname sirve para extraer la extension de la img

    }

})
app.use(multer({storage}).single('image')) //desde el front la imagen debe ser pasada con el nombre del parametro aqui definido

app.use(express.urlencoded({extended: false})) //interpreta los datos del formulario como si fuera un json
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/books',require('./routes/books'));

//Static Files
app.use(express.static(path.join(__dirname, 'public'))); //es una props de express usados para mostrar archivos estaticos del proyecto

//Settings
app.set('port', process.env.PORT || 3000);

//Start Server
app.listen(app.get('port'), ()=>{
    console.log('Server Listening on port 3000')
})