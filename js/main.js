let books = [];

function addBook() {
  const randomId = Math.floor(Math.random() * 100);
  const element = {
    id: randomId,
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
  };
  books.push(element);

  localStorage.setItem('books', JSON.stringify(books));

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';

  showBook(element);
}

function removeBook(id) {
  const newArray = books.filter((book2) => book2.id !== id);
  localStorage.setItem('books', JSON.stringify(newArray));
}

function showBook(book) {
  let element;
  const div = document.createElement('div');
  element = document.createElement('p');
  element.appendChild(document.createTextNode(book.title));
  div.appendChild(element);
  element = document.createElement('p');
  element.appendChild(document.createTextNode(book.author));
  div.appendChild(element);
  element = document.createElement('button');
  element.setAttribute('type', 'button');
  element.appendChild(document.createTextNode('Remove'));
  element.addEventListener('click', () => {
    // remove the book from the screen
    div.remove(book.id);
    // remove the book from the local storage
    removeBook(book.id);
  });
  div.appendChild(element);
  element = document.createElement('hr');
  div.appendChild(element);
  document.getElementById('book-cont').appendChild(div);
}

window.addEventListener('load', () => {
  books = JSON.parse(localStorage.getItem('books'));
  if (books === null) {
    books = [];
  }

  books.forEach((element) => {
    showBook(element);
  });
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});

