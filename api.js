const API_URL = "https://6ae2c651bbb54129229a61b1.mockapi.io/books";

// 목록
async function getBooks() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("목록을 불러오지 못했습니다.");
  }
  return await res.json();
}

// 추가
async function addBook(book) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) {
    throw new Error("등록 실패");
  }
}

// 수정
async function updateBook(id, book) {
  const res = await fetch(API_URL + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) {
    throw new Error("수정 실패");
  }
}

// 삭제
async function deleteBook(id) {
  const res = await fetch(API_URL + "/" + id, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("삭제 실패");
  }
}