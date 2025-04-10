import React from 'react';
import useNavigationHandler from '../components/useNavigationHandler';

const Home_page = () => {
  const { goHome, goLogin, goMyPage } = useNavigationHandler();

  return (
      <div>
          <h1>홈 페이지 입니다</h1>
          <button onClick={goHome}>홈으로</button>
          <button onClick={goLogin}>로그인</button>
          <button onClick={goMyPage}>마이페이지</button>
      </div>
  );
};
export default Home_page;