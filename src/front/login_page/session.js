//로그인 되었는지 확인
export const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user !== null;
};