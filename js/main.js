var books = [];

window.addEventListener('load', ()=>{
  books =JSON.parse(localStorage.getItem('books'));
  if(books === null){
    books = [];
  }
})

document.getElementById('form').addEventListener('submit', (e)=>{
  e.preventDefault();
  let random_id = Math.floor(Math.random() * 100);
  books.push(
    {
      id: random_id,
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
    },
  );

  localStorage.setItem('books', JSON.stringify(books));
})