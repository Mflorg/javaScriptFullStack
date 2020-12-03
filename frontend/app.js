require('./styles/app.css');

import UI from './UI'
//captura el evento de save books
document.addEventListener('DOMContentLoaded', ()=>{ //este evento carga los datos del back una vez q cargue el dom
   const ui= new UI();
   ui.renderBooks();
})
document.getElementById('bookForm')
.addEventListener('submit', e=>{
   const tittle= document.getElementById('tittle').value;
   const author= document.getElementById('author').value;
   const isbn= document.getElementById('isbn').value;
   const image= document.getElementById('image').files;

   const formdata= new FormData()
   //agrego los datos a un formulario, lo que me permitira pasar la imagen al back
   formdata.append('image', image[0]); //que es donde se guarda la img
   formdata.append('isbn', isbn);
   formdata.append('author', author);
   formdata.append('tittle', tittle);
    console.log('formdata',formdata);

    const ui= new UI();
    ui.addNewBook(formdata);
    ui.renderMessage('New Book Added', 'success', 2000);

   e.preventDefault(); // con esto indico q el formulario no se reinicie

})

//captura el evento de

document.getElementById('books-cards')
.addEventListener('click', e=>{
   if(e.target.classList.contains('delete')){
      //console.log(e.target.getAttribute('_id'))
      const ui=new UI();
      ui.deleteBook(e.target.getAttribute('_id'))
      ui.renderMessage('The book was deleted', 'danger', 2000)
   }
   e.preventDefault(); //para evitar q cada vez q haces click en un boton t lleve al inicio
} )
