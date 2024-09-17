import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from "react-router-dom";
import { useState } from 'react';
import '../style/navbar.css';
import logo from '..//assets/logo1.png';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, role } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Flatens BSK Logo" className="logo-img" />
          </Link>
        </div>

        {/* Container for user icon and menu toggle */}
        <div className="nav-right">
          {user && (
            <Link to={`/user/${user.uid}`} className="user-link">
              <FaUser className="user-icon" />
            </Link>
          )}

          <span className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu}>Nyheter</Link>
          </li>
          <li>
            <Link to="/medlemskap" onClick={closeMenu}>Medlemskap</Link>
          </li>
          <li>
            <Link to="/historia" onClick={closeMenu}>Historia</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>Kontakt</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login" onClick={closeMenu}>Logga in</Link>
            </li>
          ) : (
            <>

              

            {/* Separator */}
            <span className='separator'></span>


              {(role === 'member' || role === 'admin') && (
                <li>
                  <Link to="/members" onClick={closeMenu}>Medlemmar</Link>
                </li>
              )}
                {(role === 'member' || role === 'admin') && (
                <li>
                  <Link to="/banan" onClick={closeMenu}>Banan</Link>
                </li>
              )}

              {/* Separator */}
              <span className='separator'></span>

              {role === 'admin' && (
                <li>
                  <Link to="/admin" onClick={closeMenu}>Administration</Link>
                </li>
              )}


              {/* Separator */}
              <span className='separator'></span>
              <li>
                <Link onClick={handleLogout}>Logga ut</Link>
              </li>

            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;




// import { useAuth } from '../context/AuthContext';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';
// import { Link } from "react-router-dom";
// import { useState } from 'react';
// import '../style/navbar.css';

// const Navbar = () => {
//   const { user, role } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       window.location.href = '/login';
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   // Toggle mobile menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Close the menu
//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav>
//       <div className="nav-container">
//         <div className="nav-logo">
//           <Link to="/">Flatens BSK</Link>
//         </div>
//         <span className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
//           {isMenuOpen ? '✕' : '☰'}
//         </span>
//         <ul className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
//           <li>
//             <Link to="/" onClick={closeMenu}>Händelser</Link>
//           </li>
//           <li>
//             <Link to="/medlemskap" onClick={closeMenu}>Medlemskap</Link>
//           </li>
//           <li>
//             <Link to="/historia" onClick={closeMenu}>Historia</Link>
//           </li>
//           <li>
//             <Link to="/contact" onClick={closeMenu}>Contact</Link>
//           </li>
//           {!user ? (
//             <>
//               <li>
//                 <Link to="/login" onClick={closeMenu}>Logga in</Link>
//               </li>
//             </>

//           ) : (
//             <>
//               <li>
//                 <Link onClick={handleLogout}>Logga ut</Link>
//               </li>

//               <h3 className='nav-heading'>För medlemmar:</h3>
            
//               {(role === 'member' || role === 'admin') && (
//                 <li>
//                   <Link to="/members" onClick={closeMenu}>Medlemmar</Link>
//                 </li>
//               )}

//                 {(role === 'member' || role === 'admin') && (
//                 <li>
//                   <Link to="/banan" onClick={closeMenu}>3D bana</Link>
//                 </li>
//                 )}

//                 <h3 className='nav-heading'>För admins:</h3>
//               {(role === 'admin') && (
//                 <li>
//                   <Link to="/register" onClick={closeMenu}>Registrera medlem</Link>
//                 </li>
//               )}
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
