
import BookServices from './services/BookServices'
import {format} from 'timeago.js';
const bookservices = new BookServices();//hereda de la clase


//esta clase se encarga de manejar los elementos y eventos del DOM
class UI {

    //metodos
    async renderBooks() {
        const books = await bookservices.getBooks();
        const bookCardConteiner = document.getElementById('books-cards');
        bookCardConteiner.innerHTML = ''; //esto es para q el componente se limpie cada vez q cargue
        books.forEach(book => {
            const div = document.createElement('div')
            div.className = '';
            div.innerHTML = `
          <div class="card m-3">
                        <div class="row no-gutters">
                             <div class="col-md-4">
                                  <img src="${book.imagePath}" class="img-fluid"/>
                             </div>
                             <div class="col-md-8">
                                 <div class="card-block px-2">
                                    <h4 class="card-title">${book.tittle}</h4>
                                    <p  class="card-text">${book.author}</p>
                                    <a href="#" class="btn btn-danger delete" _id="${book._id}">Delete</a>
                                 </div>
                             </div>
                             <div class="card-footer w-100 text-muted">>
                             ${format(book.createAt)}
                             </div>
                        </div>
          </div>`; //con esto le indico que quiero que este dentro de ese div
          bookCardConteiner.appendChild(div) //lo agregamos como hijo
        })

    }

    async addNewBook(book) {
        await bookservices.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm() {
        document.getElementById('bookForm').reset();
    }
    renderMessage(message, color, secondstoRemove) { 
        //esta funcion recibe un mensaje q se mostrara como respuesta a un evento
        const div= document.createElement('div'); //creo el lugar donde se lo va a ver
        div.className=`alert alert-${color} message`;
        div.appendChild(document.createTextNode(message))

        const container=document.querySelector('.col-md-4'); //selecciono el container del html donde quiero guardar el msj
        const bookform= document.querySelector('#bookForm');
        container.insertBefore(div , bookform)//le indico donde quiero agregar el msj
        setTimeout(()=>{
            document.querySelector('.message').remove(); //esto es para eliminar el msj desp de un tiempo y no quede permanentemente

        },secondstoRemove);

    }

    async deleteBook(idBook) {
       await bookservices.deleteBook(idBook);
       this.renderBooks();
     }

}

export default UI;