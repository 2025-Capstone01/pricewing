const express = require("express");
const cors = require("cors");
const app = express();

// 라우터 불러오기
const searchRouter = require("./routes/search");


// 미들웨어 설정
app.use(cors());                 // CORS 허용 (프론트엔드 요청 받을 수 있게)
app.use(express.json());        // JSON 요청 파싱

// 검색 API 라우터 연결 (/api/search → search.js 처리)
app.use("/api/search", searchRouter);


// 서버 실행
app.listen(5050, () => {
    console.log("백엔드 서버 실행 중 http://localhost:5050");
});
