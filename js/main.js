class BookCollection {
  #index;

  books;

  constructor(books = []) {
    this.#index = 0;
    this.books = books;
  }

  addBook(tit, auth) {
    const newId = (this.books === null || this.books.length === 0) ? 0
      : this.books[this.books.length - 1].id + 1;
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
    element.setAttribute('class', 'book-title');
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
    this.books = newArray;
  }
}

let books = new BookCollection();

window.addEventListener('load', () => {
  // display the date
  document.getElementById('date').innerText = new Date().toUTCString()
  // fetch data from local storage
  if (JSON.parse(localStorage.getItem('books')) !== null) {
    books = new BookCollection(JSON.parse(localStorage.getItem('books')));
    books.books.forEach((element) => {
      books.showBook(element);
    });
  } else {
    books = new BookCollection();
  }
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  books.addBook(document.getElementById('title').value, document.getElementById('author').value);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});

document.getElementById('list-link').addEventListener('click', () => {
  document.getElementById('book-cont').classList.remove('hidden');
  document.getElementById('form').classList.add('hidden');
  document.getElementById('contact').classList.add('hidden');
});

document.getElementById('add-link').addEventListener('click', () => {
  document.getElementById('book-cont').classList.add('hidden');
  document.getElementById('form').classList.remove('hidden');
  document.getElementById('contact').classList.add('hidden');
});

document.getElementById('contact-link').addEventListener('click', () => {
  document.getElementById('book-cont').classList.add('hidden');
  document.getElementById('form').classList.add('hidden');
  document.getElementById('contact').classList.remove('hidden');
});
