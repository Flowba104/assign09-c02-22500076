# 📚 도서 관리 서비스

## Deployment
- GitHub: <깃허브 레포 주소>
- Vercel: <vercel 배포 주소>
- MockAPI Endpoint: https://6ae2c651bbb54129229a61b1.mockapi.io/books

## Service
- 주제: 도서 관리
- Field: id, title(제목), author(저자), genre(장르), price(가격), rating(평점)
- CRUD
  - GET: 페이지 시작 시 도서 목록 조회
  - POST: 폼 입력값으로 도서 등록
  - PUT: 수정 버튼으로 기존 값을 폼에 불러와 수정 (MockAPI가 PATCH를 지원하지 않아 PUT 사용)
  - DELETE: confirm() 확인 후 삭제
- Validation: 제목/저자 필수, 장르 선택 필수, 가격 0보다 큼, 평점 1~5
- 검색: 제목 또는 저자로 검색 (filter 사용)
- 요청 실패 시 화면에 오류 메시지 표시

## Key Learning
1. fetch()는 404, 500 같은 에러 응답에도 catch로 넘어가지 않아서 res.ok로 직접 확인하고 throw 해야 한다.
2. async/await와 try/catch로 서버 요청을 기다리고 실패를 처리하는 방법을 배웠다.
3. REST API는 같은 주소(/books, /books/:id)에 GET/POST/PUT/DELETE 메서드만 바꿔서 조회·추가·수정·삭제를 한다. 데이터를 서버에 저장하니까 새로고침해도 유지된다.

## AI / Search Usage
- 도구: gemini
- 사용 목적: 단계별 구현 순서 안내, CRUD 코드 작성, 오류 원인 찾기
- 참고/반영한 기능: fetch 요청 함수(api.js), 등록/수정/삭제/검색 로직, 입력값 검사
- 직접 수정한 내용: 코드 단계별로 직접 붙여넣고 테스트, 파일 구조를 폴더 없이 정리, 함수 배치 정리
- 배운 점: 코드를 단계별로 나눠서 넣고 매번 확인하니까 어디서 문제가 생기는지 찾기 쉬웠다.
- 본인 추정 AI 코드 기여율: 30%

## Problem & Solution / Reflection
- 문제 1: 처음 push할 때 "no upstream branch" 에러
  - 해결: git push -u origin main으로 원격 브랜치 연결
- 문제 2: 목록에 undefined가 뜨고 등록한 데이터가 제대로 저장되지 않음
  - 원인: MockAPI 리소스를 만들 때 기본 필드(name, avatar)를 그대로 둬서 title, author 등이 없었음
  - 해결: 스키마를 title, author, genre, price, rating으로 다시 설정
- 문제 3: 수정 버튼을 눌러도 새로 등록되고, 삭제 버튼이 동작하지 않음
  - 원인: submit에 수정 분기(editId)가 없었고 removeBook, addBook 함수가 빠져 있었음
  - 해결: 빠진 함수를 추가하고 api.js / app.js 역할을 나눠 정리
- 느낀 점: 서버에 데이터를 저장하니 새로고침해도 유지되는 게 배열만 쓸 때와 가장 큰 차이였다. 다음엔 코드를 더 직접 짜보고 싶다.