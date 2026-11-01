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
let editId = null; // 수정중인 책 id (없으면 null)

function startEdit(id) {
  const book = books.find(function (b) {
    return b.id == id;
  });

  editId = id;
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("genre").value = book.genre;
  document.getElementById("price").value = book.price;
  document.getElementById("rating").value = book.rating;

  document.getElementById("form-title").textContent = "도서 수정";
  document.getElementById("submit-btn").textContent = "수정";
  document.getElementById("cancel-btn").hidden = false;
}

function cancelEdit() {
  editId = null;
  form.reset();
  document.getElementById("form-title").textContent = "도서 등록";
  document.getElementById("submit-btn").textContent = "등록";
  document.getElementById("cancel-btn").hidden = true;
}

document.getElementById("cancel-btn").addEventListener("click", cancelEdit);

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
    if (book.title == "") {
    showMessage("제목을 입력하세요", "error");
    return;
  }
  if (book.author == "") {
    showMessage("저자를 입력하세요", "error");
    return;
  }
  if (book.genre == "") {
    showMessage("장르를 선택하세요", "error");
    return;
  }
  if (book.price <= 0) {
    showMessage("가격을 제대로 입력하세요", "error");
    return;
  }
  if (book.rating < 1 || book.rating > 5) {
    showMessage("평점은 1~5 사이로 입력하세요", "error");
    return;
  }

  try {
    await addBook(book);
    showMessage("등록 완료!", "success");
    form.reset();
    loadBooks();
  } catch (err) {
    showMessage(err.message, "error");
  }
});