const API_URL = "https://6ae2c651bbb54129229a61b1.mockapi.io/books";

//목록
async function getBooks() {
  const res = await fetch(API_URL);
  return await res.json();
}

let books = [];

const list = document.getElementById("book-list");
