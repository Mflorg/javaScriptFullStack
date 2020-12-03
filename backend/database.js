const mongoose= require('mongoose');


mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true, //con esto se impedira que se mande un error externo
    useFindAndModify:true
}) //conexion a la BD
.then(db=>{console.log('DB is connected')})
.catch(error=>console.error(error))
//necesita que el servicio de mongo db corriendo