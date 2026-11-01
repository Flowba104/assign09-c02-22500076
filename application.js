//표
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
  books = await getBooks();
  render(books);
}

loadBooks();