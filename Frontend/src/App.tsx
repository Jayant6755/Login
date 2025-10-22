import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import CardDemo from "./pages/login";
import LoginSuccess from "./pages/loginsuccess";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CardDemo/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loginsuccess" element={<LoginSuccess/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
