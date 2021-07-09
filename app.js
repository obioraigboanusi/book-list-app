'use strict'

        const bookList= document.getElementById('book-list');

// Book constructor
function Book(title, author, isbn){
    this.title= title;
    this.author= author;
    this.isbn=isbn;
};

// UI constructor
function UI() {};

// add book prototype
UI.prototype.addBooK= function(book){
    const bookList= document.getElementById('book-list')
    bookList.insertAdjacentHTML('afterbegin', rowTemplate(book))
}

//clear fields prototype
UI.prototype.clearFiends= function(){
    document.getElementById('title').value=''
    document.getElementById('author').value=''
    document.getElementById('isbn').value=''
}
// show alert prototype
UI.prototype.showAlert= function(message, alartClass){
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

UI.prototype.removeBook = function(elemet){
    if(elemet.className==='remove-book'){
        elemet.parentElement.parentElement.remove()
    }
    
}
    
document.querySelector('#book-list').addEventListener('click', function(e){
    e.preventDefault()
   
    const ui = new UI()
    ui.removeBook(e.target)
    ui.showAlert('Book removed succcessfully!', 'success')
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