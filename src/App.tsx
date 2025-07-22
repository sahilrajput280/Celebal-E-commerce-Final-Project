import './App.css'
import LandingPage from './pages/LandingPage';
import Register from "./pages/register";
import Login from "./pages/login"; // <-- Import Login
import About from "./components/About";
import Cart from "./pages/Cart";
import Services from "./components/services";
import Chatbot from "./components/ChatBot";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/services" element={<Services />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
}

export default App;