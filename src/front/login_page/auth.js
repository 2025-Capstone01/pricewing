// Firebase방식으로 로그인, 회원가입하고 MySQL에 저장하기
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    //signInWithRedirect,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, provider } from './firebase';

// 회원가입 (이메일로)
export const registerWithEmail = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    localStorage.setItem('user', JSON.stringify(user));

    // 백엔드 API 호출하여 사용자 정보 MySQL에 저장
    await fetch('http://localhost:5050/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password }), // 테스트용, 실제 프로젝트에서는 반드시 암호화!
    });

    return user;
};

// 로그인 (이메일로)
export const loginWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
};

// ✅ 구글 로그인 후 MySQL에 사용자 저장
export const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    localStorage.setItem('user', JSON.stringify(user));

    // 구글 로그인은 비밀번호를 제공하지 않지만, 이메일은 저장
    await fetch('http://localhost:5050/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: '' }), // 비밀번호는 비워둠
    });

    return user;
};

// 로그아웃
export const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
};