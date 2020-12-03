const {Schema, model}= require('mongoose');

const BookSchema=new Schema({
    tittle:{ type: String, required:true},
    author:{type: String, required:true},
    isbn:{type: String, required:true},
    imagePath:{type: String, required:true},
    createAt: {type: Date, default: Date.now}

})

module.exports= model('Book', BookSchema)