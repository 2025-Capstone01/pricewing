import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./front/home_page/home_page";
import Login from "./front/login_page/login_page";
import My from "./front/my_page/my_page";
import Signup from "./front/signup_page/signup_page";


function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my" element={<My />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>

      </div>
  );
}
export default App;
