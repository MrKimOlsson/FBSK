import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import Home from './pages/HomePage';
import MembersPage from './pages/MembersPage'
import MembershipPage from './pages/MembershipPage';
import CoursePage from './pages/CoursePage';
import UserPage from './pages/UserPage';
import Register from "./components/Register";
import Login from "./pages/LoginPage";
import GoogleLogin from "./components/GoogleLogin";
import Navbar from "./components/Navbar";
import HistoryPage from './pages/HistoryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function App() {
  const { user, role } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medlemskap" element={<MembershipPage />} />
          <Route path="/historia" element={<HistoryPage />} />
          <Route path="/banan" element={<CoursePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/members" element={user && role === 'admin' ? <MembersPage /> : <Navigate to="/" />} />
          <Route path="/admin" element={user && role === 'admin' ? <AdminPage /> : <Navigate to="/" />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/google-login" element={<GoogleLogin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



