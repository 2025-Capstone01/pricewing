import {Routes, Route} from "react-router-dom";
import './App.css';
import home from "./front/home_page/home_page";
import login from "./front/login_page/login_page";
import my from "./front/my_page/my_page";

function App() {
  return (
      <div className="App">
        <Routes>
          <Routes path="/" element={<home />} />
          <Routes path="/login" element={<login />} />
          <Routes path="/edit" element={<my />} />
        </Routes>
      </div>
  );
}
export default App;
