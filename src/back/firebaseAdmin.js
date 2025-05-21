//백엔드 서버가 종료된 상태에서도 Firebase를 통해 신규 사용자가 등록되는 오류를 방지하기 위해, 서버 측에서 회원가입 기능을 구현함
require("dotenv").config(); // .env 불러오기
const admin = require("firebase-admin");
const path = require("path");

// 환경변수에서 Firebase 인증 키 경로 가져오기
const serviceAccountPath = process.env.FIREBASE_ADMIN_KEY_PATH;

if (!serviceAccountPath) {
    throw new Error("❌ .env 파일에 FIREBASE_ADMIN_KEY_PATH 환경변수가 설정되어 있지 않습니다.");
}

// JSON 파일 경로를 require()로 불러오기
const serviceAccount = require(path.resolve(serviceAccountPath));

// Firebase 초기화
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
