# FILM - Fall In Love with Movie
![logo1](https://user-images.githubusercontent.com/60064471/203241962-c2db2cdc-7be1-45dd-b669-4a75c6d703cb.png)

### [FILM - Fall In Love with Movie](https://fall-in-love-with-movie.vercel.app/)
영화 별점 평가와 코멘트를 남길 수 있는 서비스입니다.

## 1. 사용 기술
|Language|Framework|Database|
|:---:|:---:|:---:|
|![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)|![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)|![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)|

## 2. 주요 기능 소개
- 회원가입 / 로그인
- 영화 정보 검색
- 별점 평가 / 코멘트 작성
- 반응형 디자인
  <details>    
    <summary>자세히 보기</summary>

    ### 2-1. 회원가입 / 로그인
    ![auth](https://user-images.githubusercontent.com/60064471/203223033-4776d8c6-c2d8-49b1-9ae9-bda3c6f4ac03.gif)
    - `NestAuth.js`를 사용해 인증 기능 구현
    - **Client**와 **Server** 양쪽에서 입력 값에 대한 **Validation**
    ### 2-2. 영화 정보 검색
    ![search](https://user-images.githubusercontent.com/60064471/203223071-4a9f0187-a117-41d4-a204-359f830dc566.gif)
    - 영화 정보는 [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction)를 이용 
    ### 2-3. 별점 평가 / 코멘트 작성
    ![rating](https://user-images.githubusercontent.com/60064471/203223074-3d946a6e-7efe-4593-8298-a4005c9f0919.gif)
    - 로그인 후 별점 평가와 코멘트 작성이 가능
    ### 2-4. 반응형 디자인
    ![responsive](https://user-images.githubusercontent.com/60064471/203244732-3d78bf5e-ac7b-40cd-b103-1619c7cdecd6.gif)
    - 휴대전화 / 데스크탑 화면 크기에 맞춘 반응형 디자인
  </details>

## 3. 트러블 슈팅
<details>
  <summary>3-1. OPEN API 요청 시 CORS 이슈</summary>
  
  
  ### 😣 문제 상황  
  - **Client**에서 OPEN API 요청을 보냈더니 CORS 이슈 발생
  ### ✅ 해결
  - OPEN API 요청을 보내는 코드를 API routes로 옮기고 **Client**에서는 API routes를 통해 데이터를 받아오도록 조치
</details>
<details>
  <summary>3-2. 새로고침시 API 오류</summary>

  
  ### 😣 문제 상황
  ```javascript
  const getMovieDetail = async (movieId: string) => {
    const response = await axios.post('/api/detail/detail', {
      movieId: movieId,
    });
    const data = response.data.data;
    return data;
  };
  ```
  ![image](https://user-images.githubusercontent.com/60064471/203254149-78a109d8-8779-498a-9d4c-7063560aea66.png)
  - 브라우저의 주소창을 통해 해당 페이지에 접근하거나 새로고침을 할 경우 API 에러 발생.
  
  ### ✅ 해결
  ```javascript
  import axios from 'axios';

  async function handler(req: any, res: any) {
    const { movieId } = req.body;
    if (movieId === undefined) {
      return;
    }
    const response = await axios({
      url: `https://api.themoviedb.org/3//movie/${movieId}?api_key=${process.env.API_KEY}&language=ko-KR`,
      method: 'get',
    });
    res.status(201).json({ data: response.data });
  }

  export default handler;
  ```
  - `movieId`에 값이 할당되지 않고 `undefined`인 상태에서 요청을 해 발생한 문제
  - `movieId`가 `undefined`일 경우 **Early return**하도록 조치
  
</details>
<details>
  <summary>3-3. Mongo DB Atlas 비정상적인 커넥션</summary>
  
  
  ### 😣 문제 상황
  ![image](https://user-images.githubusercontent.com/60064471/203250307-53de7ede-160e-4313-b804-806297ab6a83.png)
  - 코멘트 작성 기능 개발 중 갑자기 Mongo DB에 연결이 되지 않는 현상 발생
  - 경고 메일을 통해 500개가 넘는 비정상적인 동시 커넥션이 발생한 것을 확인
  ### ✅ 해결
  ```javascript
  const client = await connectToDatabase();
  const db = client.db('film');
  ```
  - API routes에서 요청을 받을 때마다 새로 DB에 접속을 한 후 접속을 종료하지 않아서 발생한 문제
  - `client.close()`를 추가해 DB 사용이 끝나면 연결을 종료하도록 조치
</details>
