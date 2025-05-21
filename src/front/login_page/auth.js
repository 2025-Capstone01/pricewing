// Firebase방식으로 로그인, 회원가입하고 MySQL에 저장하기
import {
    signInWithEmailAndPassword,
    //signInWithRedirect,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, provider } from './firebase';

// 회원가입 Firebase + MySQL(이메일로)
export const registerWithEmail = async (email, password) => {
    const response = await fetch("http://localhost:5050/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "서버 오류");
    }

    // user_id 저장
    if (result.user_id) {
        localStorage.setItem('user_id', result.user_id);
    }

    return { email, user_id: result.user_id };
};

// 로그인 (이메일로)
export const loginWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem('user', JSON.stringify(user));

    // 로그인 후 user_id 조회
    const idRes = await fetch(`http://localhost:5050/api/users/id?email=${email}`);
    const idResult = await idRes.json();

    if (idResult.user_id) {
        localStorage.setItem('user_id', idResult.user_id);
    }

    return user;
};

// ✅ 구글 로그인 후 MySQL에 사용자 저장
//구글 로그인 후 Firebase UID와 함께 MySQL에 사용자 저장
export const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    localStorage.setItem('user', JSON.stringify(user));

    // 구글 로그인은 비밀번호를 제공하지 않지만, 이메일은 저장
    const apiRes = await fetch('http://localhost:5050/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, uid: user.uid, password: '' }), // 비밀번호는 비워둠
    });

    //const result = await apiRes.json(); //등록 경로에 오류가 발생하면 예기치 않은 토큰 '<'가 보고된다.그래서 이거 사용x
    let result;

    try {
        result = await apiRes.json();
    } catch (err) {
        throw new Error("서버로부터 올바른 JSON 응답을 받지 못했습니다. 아마도 경로 또는 서버 오류입니다.");
    }

    // user_id 저장
    if (result.user_id) {
        localStorage.setItem('user_id', result.user_id);
    } else {
        // 이미 등록된 사용자일 수 있으므로, 다시 조회
        const idRes = await fetch(`http://localhost:5050/api/users/id?email=${user.email}`);
        const idResult = await idRes.json();
        if (idResult.user_id) {
            localStorage.setItem('user_id', idResult.user_id);
        }
    }

    return user;
};

// 로그아웃
export const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
};