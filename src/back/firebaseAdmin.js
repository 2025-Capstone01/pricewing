//백엔드 서버가 종료된 상태에서도 Firebase를 통해 신규 사용자가 등록되는 오류를 방지하기 위해, 서버 측에서 회원가입 기능을 구현함
const admin = require("firebase-admin");
const serviceAccount = require("./pricewing-5822c-firebase-adminsdk-fbsvc-c4479acd9e.json");//Firebase 프로젝트 설정에서 생성된 서비스 키（비공개）

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
