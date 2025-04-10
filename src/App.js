import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./front/home_page/home_page";
import Login from "./front/login_page/login_page";
import My from "./front/my_page/my_page";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/*로그인페이지*/}
          <Route path="/login" element={<Login />} />
          {/*마이페이지*/}
          <Route path="/my" element={<My />} />
        </Routes>
      </div>
  );
}
export default App;
