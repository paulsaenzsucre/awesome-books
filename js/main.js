let books = new bookCollection();

class bookCollection {
  #index;
  books;

  constructor(books = []) {
    this.#index = 0;
    this.books = books;
  }

  addBook(tit, auth) {
    let newId = (this.books === null || this.books.length === 0) ? 0 : this.books[this.books.length - 1].id + 1;
    const element = {
      id: newId,
      title: tit,
      author: auth,
    };

    this.books.push(element);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBook(element);
  }

  showBook(book) {
    let element;
    const div = document.createElement('div');
    div.setAttribute('class', 'book-card');
    element = document.createElement('p');
    element.appendChild(document.createTextNode(book.title));
    element.setAttribute('class', 'book-title')
    div.appendChild(element);
    element = document.createElement('p');
    element.appendChild(document.createTextNode(book.author));
    element.setAttribute('class', 'book-author');
    div.appendChild(element);
    element = document.createElement('button');
    element.setAttribute('type', 'button');
    element.setAttribute('class', 'book-btn');
    element.appendChild(document.createTextNode('Remove'));
    element.addEventListener('click', () => {
      // remove the book from the screen
      div.remove();
      // remove the book from the local storage
      this.removeBook(book.id);
    });
    div.appendChild(element);
    document.getElementById('book-cont').appendChild(div);
  }

  removeBook(id) {
    const newArray = this.books.filter((book2) => book2.id !== id);
    localStorage.setItem('books', JSON.stringify(newArray));
  }

}

window.addEventListener('load', () => {
  let books = new bookCollection(JSON.parse(localStorage.getItem('books')));
  books.books.forEach((element) => {
    books.showBook(element);
  });
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  books.addBook(document.getElementById('title').value, document.getElementById('author').value);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});