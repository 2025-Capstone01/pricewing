// src/back/notify.js
const nodemailer = require('nodemailer');

// ✅시스템에서 사용할 Gmail 계정 정보 (발신자)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bingjie210@gmail.com',           //이메일
        pass: 'yctlfgxtpjqcswee'          //구글에서 발급한 비밀번호 https://myaccount.google.com/apppasswords
    }
});

// 가격 변동 알림 이메일 발송 함수
async function sendEmail(to, productTitle, newPrice, productUrl) {
    const mailOptions = {
        from: 'bingjie210@gmail.com',          // 발신자
        to,                                     // 수신자 musinsa user.email
        subject: '📉 가격 변동 알림',
        text: `📢 당신이 찜한 "${productTitle}" 상품이 ${newPrice.toLocaleString()}원으로 떨어졌습니다! 
        👉 상품 링크: ${productUrl}지금 확인해보세요.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ 이메일 발송 성공 → ${to}`);
    } catch (error) {
        console.error(`❌ 이메일 발송 실패 (${to}):`, error);
    }
}

module.exports = { sendEmail };
