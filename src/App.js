<<<<<<< HEAD
import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./front/home_page/home_page";
import Login from "./front/login_page/login_page";
import My from "./front/my_page/my_page";
import SignUp from "./front/login_page/signUp_page"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                {/*로그인페이지*/}
                <Route path="/login" element={<Login />} />
                {/*마이페이지*/}
                <Route path="/my" element={<My />} />
                {/*회원가입페이지*/}
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </div>
    );
}
export default App;
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppTheme from './shared-theme/AppTheme';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
      <div className="App">
      <Navbar />
      <AppTheme>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
      </AppTheme>
      </div>
  );
}

export default App;
>>>>>>> 4f9c277796341e61d5583a2e1013c50e27746a5d
