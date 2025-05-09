import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, provider } from '../firebase';

// sign up
export const registerWithEmail = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    localStorage.setItem('user', JSON.stringify(user));

    // 调用后端 API 保存用户
    await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password }), // 仅测试用，真实项目请加密！
    });

    return user;
};

// login
export const loginWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
};

// ✅ Google login（MySQL）
export const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    localStorage.setItem('user', JSON.stringify(user));

    // Google 登录不提供密码，但也记录邮箱
    await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: '' }), // password 留空
    });

    return user;
};
//logout
export const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
};