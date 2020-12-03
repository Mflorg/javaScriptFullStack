// services define los servicos necesarios que se comunicaran con la api

class BookService{
    constructor(){
        this.URI= '/api/books'
    }

    //metodos para interactuar con el backend
    //se puede utilizar async await o promesas
   async getBooks(){
        const resp= await fetch(this.URI); //metodo de JS que por defecto hara una peticion get al server
       const books = await resp.json();
       return books;

    }
    async postBook(book){
        console.log(book)
    const resp= await fetch(this.URI,{
            method: 'POST',
            body: book
        });
        const data= await resp.json();
        console.log(data)
    }

    async deleteBook(idBook){
       const resp= await fetch(`${this.URI}/${idBook}`,{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        const data= await resp.json();
        console.log(data.message)

    }

}

export default BookService;