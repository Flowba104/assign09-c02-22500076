const API_URL = "https://6ae2c651bbb54129229a61b1.mockapi.io/books";

//목록
async function getBooks() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("목록을 불러오지 못했습니다.");
  }
  return await res.json();
}

