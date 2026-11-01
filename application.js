//표
let books = [];

const list = document.getElementById("book-list");

const message = document.getElementById("message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}  

function render(data) {
  list.innerHTML = "";

  data.forEach(function (book) {
    list.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.price}원</td>
        <td>${book.rating}점</td>
        <td>
          <button onclick="startEdit('${book.id}')">수정</button>
          <button onclick="removeBook('${book.id}')">삭제</button>
        </td>
      </tr>
    `;
  });
}

async function loadBooks() {
  try {
    books = await getBooks();
    render(books);
  } catch (err) {
    showMessage(err.message, "error");
  }
}

loadBooks();

const form = document.getElementById("book-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const book = {
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    genre: document.getElementById("genre").value,
    price: Number(document.getElementById("price").value),
    rating: Number(document.getElementById("rating").value),
  };

  try {
    await addBook(book);
    showMessage("등록 완료!", "success");
    form.reset();
    loadBooks();
  } catch (err) {
    showMessage(err.message, "error");
  }
});