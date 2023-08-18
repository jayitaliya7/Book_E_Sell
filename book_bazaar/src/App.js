import "./App.css";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
