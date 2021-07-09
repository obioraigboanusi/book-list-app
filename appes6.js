'use strict'
// Store books Constructor
class StoreBooks{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book){
        const books = this.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
        const ui = new UI()
        ui.setCounter(books)
    }
    static deleteBook(isbn){
        const books = this.getBooks();
        books.map((book, index)=>{
            if(book.isbn===isbn){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
        const ui = new UI()
            ui.setCounter(books)

    }

    static displayBooks(){
        const ui = new UI()
        const books = this.getBooks();
        books.map((book)=>{
           
            ui.addBooK(book)
        })
        ui.setCounter(books) 
    }
}
// Book constructor
class Book{
    constructor(title, author, isbn){
        this.title= title;
        this.author= author;
        this.isbn=isbn;
    };
}

// UI constructor
class UI {
    
// add book prototype
addBooK(book){
    const bookList= document.getElementById('book-list')
    bookList.insertAdjacentHTML('afterbegin', rowTemplate(book))
}

//clear fields prototype
clearFiends(){
    document.getElementById('title').value=''
    document.getElementById('author').value=''
    document.getElementById('isbn').value=''
}
// show alert prototype
showAlert(message, alartClass){
    //push alert
    document.getElementById('alert-box').innerHTML= `
    <div class="alert ${alartClass}">
        ${message}        
    </div> `

    // remove alert after 3 sec
    setTimeout(function(){
        document.getElementById('alert-box').innerHTML=''
    }, 3000)

}

removeBook (elemet){
        elemet.parentElement.parentElement.remove()
}
setCounter(books){
 document.getElementById('counter').textContent=books.length;
}
};

document.addEventListener('DOMContentLoaded',()=>{
    StoreBooks.displayBooks()
});


document.querySelector('#book-list').addEventListener('click', function(e){
    e.preventDefault()
   
    const ui = new UI()
    if(e.target.className==='remove-book'){
    ui.removeBook(e.target)
    // console.log(e.target.parentElement.previousElementSibling.textContent)
    StoreBooks.deleteBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book removed succcessfully!', 'success')
    }
})

document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault()  
    const title = document.getElementById('title').value
        author= document.getElementById('author').value
        isbn= document.getElementById('isbn').value
        
    const book = new Book(title, author, isbn)
// Instantiate UI object
  const ui = new UI()
// check if any field is empty or not
    if(title==='' | author==='' | isbn===''){
        ui.showAlert('Please file out all fields', 'error')
    }else{
        StoreBooks.addBook({title, author, isbn})
        ui.addBooK(book)
        ui.clearFiends()
        ui.showAlert('Book added succcessfully!', 'success')
    }   
})

function rowTemplate(book){
    return`    <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><div class='remove-book'>x</div></td>
                </tr>`
}