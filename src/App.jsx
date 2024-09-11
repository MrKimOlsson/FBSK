import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Register from "./components/Register";
import Login from "./components/Login";
import GoogleLogin from "./components/GoogleLogin";
import Navbar from "./components/Navbar";

function App() {
  const { user, role } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={user && role === 'admin' ? <Register /> : <Navigate to="/" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/google-login" element={<GoogleLogin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



