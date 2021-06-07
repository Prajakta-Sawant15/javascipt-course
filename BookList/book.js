// book constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// ui constructor

function UI() { }

UI.prototype.addBooktoList = function (book) {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');

    // insert calls
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`
    list.appendChild(row);
}

UI.prototype.clearFields = function () {
    document.getElementById('title').value = ""
    document.getElementById('author').value = ""
    document.getElementById('isbn').value = ""
}

UI.prototype.showAlert = function (msg, className) {
    // CREATE DIV
    const div = document.createElement('div');
    // add class
    div.className = `alert ${className}`;
    // add text node
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)
}

// delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}


// eventlistners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {

    // get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn)

    // instantiate UI
    const ui = new UI()

    // validate 
    if (title === '' || author === '' || isbn === '') {
        // error alert 
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBooktoList(book)
        // ui clear fields
        ui.clearFields()
        // show success
        ui.showAlert('Book Added', 'success');
    }

    e.preventDefault()
})

// event listner for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    // instantiate UI
    const ui = new UI()
    ui.deleteBook(e.target)
    e.preventDefault();
    // show alert
    ui.showAlert('Book Removed', 'success');
})