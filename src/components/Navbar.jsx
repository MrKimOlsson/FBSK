import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from "react-router-dom";
import { useState } from 'react'; // Import useState to handle mobile menu toggle
import '../style/navbar.css';

const Navbar = () => {
  const { user, role } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility on mobile

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">Flatens BSK</Link>
        </div>
        <span className="menu-toggle" onClick={toggleMenu}>
          ☰ {/* Hamburger menu icon */}
        </span>
        <ul className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              {role === 'admin' && (
                <li>
                  <Link to="/register">Register</Link>
                </li>
              )}
              {(role === 'member' || role === 'admin') && (
                <li>
                  <Link to="/members">Members</Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
