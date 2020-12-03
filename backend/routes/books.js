const { Router } = require('express')

const router = Router();
const { unlink } =require('fs-extra');//es necesario para eliminar los datos del seervidor
const path= require('path');

const Book = require('../models/Book');

router.get('/', async (req, res) => {
    const books = await Book.find(); //busca los libros y los devuelve en la variable definida
    res.json(books);
})

router.post('/', async (req, res) => {
    const {tittle, author, isbn} = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({tittle, author, isbn, imagePath})
    //guardamos el libro
    await newBook.save(); //usamos await ya que es un evento asyncrono

    res.json({
        message: 'success',
        book: newBook
    })
})

router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    //para eliminar la imagen
    unlink(path.resolve(`./backend/public${book.imagePath}`))
    res.json({
        message: 'This Book was delete',
        book: book
    })

})
module.exports = router;