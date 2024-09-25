import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import '../style/UserPage.css'; // Add your CSS file here
import '../index.css';

// Lazy load components
const FadeInBox = React.lazy(() => import('../components/FramerMotion').then(module => ({ default: module.FadeInBox })));
const SlideInBox = React.lazy(() => import('../components/FramerMotion').then(module => ({ default: module.SlideInBox })));

const UserPage = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the logged-in user is an admin
  const [isOwnProfile, setIsOwnProfile] = useState(false); // State to check if the logged-in user is viewing their own profile
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    payed: false,
    admin: false,
  });
  const navigate = useNavigate();
  const auth = getAuth();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, 'users', id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser(userSnap.data());
        setUpdatedUser(userSnap.data());
      } else {
        console.log('No such user!');
      }
    };

    fetchUser();
  }, [id]);

  // Check if the logged-in user is an admin or is viewing their own profile
  useEffect(() => {
    const checkUserPermissions = async () => {
      const authUser = auth.currentUser;
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        
        // Check if the user is an admin
        setIsAdmin(userData && userData.admin);

        // Check if the user is viewing their own profile
        setIsOwnProfile(authUser.uid === id); // Compare logged-in user's uid with the profile's id
      }
    };

    checkUserPermissions();
  }, [auth.currentUser, id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = (name === 'payed' || name === 'admin') ? (value === 'true') : value;
    setUpdatedUser(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  // Handle form submission to update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, updatedUser);

      setUser(updatedUser);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user: ', error.message);
      alert('Error updating user. Please check the console for details.');
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingUser(null);
    setUpdatedUser(user); // Reset to original user data
  };

  return (
    <div className="user-page-container">
      <Suspense fallback={<div>Loading animations...</div>}>
        <SlideInBox>
          {user ? (
            <Suspense fallback={<div>Loading content...</div>}>
              <FadeInBox>

              <div className='card'>

                <h2>Användare:</h2>
                <p><strong>Namn:</strong> {user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : 'No name provided'}</p>
                <p><strong>Epost:</strong> {user.email || 'Ej angett'}</p>
                <p><strong>Medlem Sedan:</strong> {user.joined ? new Date(user.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
                <p className={user.payed ? 'Betald' : 'Ej betald'}>
                  <strong>Medlemsavgift:</strong> {user.payed ? 'Betald' : 'Ej betald'}
                </p>
                <p><strong>Favorit pilbåge:</strong> {user.bow || 'Ej angett'}</p>
                <p><strong>Status:</strong> {user.status || 'Medlem'}</p>

              </div>


                {/* Show the edit button if the logged-in user is admin or it's their own profile */}
                {(isAdmin || isOwnProfile) && (
                  <>
                    {editingUser ? (
                      <FadeInBox>
                        <form onSubmit={handleSubmit} className="edit-user-form">
                          <h2>Edit User: {user.firstname} {user.lastname}</h2>

                          <label>
                            Förnamn:
                            <input
                              type="text"
                              name="firstname"
                              value={updatedUser.firstname}
                              onChange={handleChange}
                              required
                              autoComplete="given-name"
                            />
                          </label>

                          <label>
                            Efternamn:
                            <input
                              type="text"
                              name="lastname"
                              value={updatedUser.lastname}
                              onChange={handleChange}
                              required
                              autoComplete="family-name"
                            />
                          </label>

                          <label>
                            Epost:
                            <input
                              type="email"
                              name="email"
                              value={updatedUser.email}
                              onChange={handleChange}
                              required
                              autoComplete="email"
                            />
                          </label>

                          {isAdmin && ( // Only admins can toggle admin status
                          <label>
                            Medlemsavgift:
                            <select
                              name="payed"
                              value={updatedUser.payed ? 'true' : 'false'}
                              onChange={handleChange}
                              autoComplete="off"
                            >
                              <option value="true">Ja</option>
                              <option value="false">Nej</option>
                            </select>
                          </label>
                          )}

                          {isAdmin && ( // Only admins can toggle admin status
                            <label>
                              Administratör:
                              <select
                                name="admin"
                                value={updatedUser.admin ? 'true' : 'false'}
                                onChange={handleChange}
                                autoComplete="off"
                              >
                                <option value="true">Ja</option>
                                <option value="false">Nej</option>
                              </select>
                            </label>
                          )}

                          <button type="submit">Spara</button>
                          <button type="button" onClick={handleCancel}>Avbryt</button>
                        </form>
                      </FadeInBox>
                    ) : (
                      <button onClick={() => setEditingUser(user)}>Redigera</button> // Edit button to enable form
                    )}
                  </>
                )}

                {/* <button onClick={() => navigate('/members')}>Tillbaka till Medlemmar</button> */}
              </FadeInBox>
            </Suspense>
          ) : (
            <p>Loading user details...</p>
          )}
        </SlideInBox>
      </Suspense>
    </div>
  );
};

export default UserPage;





// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { db } from '../firebase';
// import { FadeInBox, SlideInBox } from '../components/FramerMotion';
// import '../style/UserPage.css'; // Add your CSS file here

// const UserPage = () => {
//   const { id } = useParams(); // Get user ID from URL
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false); // State to check if the logged-in user is an admin
//   const [editingUser, setEditingUser] = useState(null);
//   const [updatedUser, setUpdatedUser] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     payed: false,
//     admin: false,
//   });
//   const navigate = useNavigate();
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userRef = doc(db, 'users', id);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         setUser(userSnap.data());
//         setUpdatedUser(userSnap.data());
//       } else {
//         console.log('No such user!');
//       }
//     };

//     fetchUser();
//   }, [id]);

//   useEffect(() => {
//     const checkAdmin = async () => {
//       const authUser = auth.currentUser;
//       if (authUser) {
//         const userRef = doc(db, 'users', authUser.uid);
//         const userSnap = await getDoc(userRef);
//         const userData = userSnap.data();
//         setIsAdmin(userData && userData.admin); // Set admin status based on fetched data
//       }
//     };

//     checkAdmin();
//   }, [auth.currentUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedValue = (name === 'payed' || name === 'admin') ? (value === 'true') : value;
//     setUpdatedUser(prev => ({
//       ...prev,
//       [name]: updatedValue,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) return;

//     try {
//       const userRef = doc(db, 'users', id);
//       await updateDoc(userRef, updatedUser);

//       setUser(updatedUser);
//       setEditingUser(null);
//     } catch (error) {
//       console.error('Error updating user: ', error.message);
//       alert('Error updating user. Please check the console for details.');
//     }
//   };

//   const handleCancel = () => {
//     setEditingUser(null);
//     setUpdatedUser(user); // Reset to original user data
//   };

//   return (
//     <div className="user-page-container">
//       {/* Main content with SlideInBox animation */}
//       <SlideInBox>
//         {user ? (
//           <>
//             <FadeInBox>
//               <h2>Användare:</h2>
//               <p><strong>Namn:</strong> {user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : 'No name provided'}</p>
//               <p><strong>Epost:</strong> {user.email || 'Ej angett'}</p>
//               <p><strong>Medlem Sedan:</strong> {user.joined ? new Date(user.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
//               <p className={user.payed ? 'Betald' : 'Ej betald'}>
//                 <strong>Medlemsavgift:</strong> {user.payed ? 'Betald' : 'Ej betald'}
//               </p>
//               <p><strong>Favorit pilbåge:</strong> {user.bow || 'Ej angett'}</p>
//               <p><strong>Status:</strong> {user.status || 'Medlem'}</p>

//               {isAdmin && (
//                 <>
//                   {editingUser ? (
//                     <FadeInBox> {/* Applying FadeInBox to the edit form */}
//                       <form onSubmit={handleSubmit} className="edit-user-form">
//                         <h2>Edit User: {user.firstname} {user.lastname}</h2>

//                         <label>
//                           Förnamn:
//                           <input
//                             type="text"
//                             name="firstname"
//                             value={updatedUser.firstname}
//                             onChange={handleChange}
//                             required
//                             autoComplete="given-name"
//                           />
//                         </label>

//                         <label>
//                           Efternamn:
//                           <input
//                             type="text"
//                             name="lastname"
//                             value={updatedUser.lastname}
//                             onChange={handleChange}
//                             required
//                             autoComplete="family-name"
//                           />
//                         </label>

//                         <label>
//                           Epost:
//                           <input
//                             type="email"
//                             name="email"
//                             value={updatedUser.email}
//                             onChange={handleChange}
//                             required
//                             autoComplete="email"
//                           />
//                         </label>

//                         <label>
//                           Medlemsavgift:
//                           <select
//                             name="payed"
//                             value={updatedUser.payed ? 'true' : 'false'}
//                             onChange={handleChange}
//                             autoComplete="off"
//                           >
//                             <option value="true">Ja</option>
//                             <option value="false">Nej</option>
//                           </select>
//                         </label>

//                         <label>
//                           Administratör:
//                           <select
//                             name="admin"
//                             value={updatedUser.admin ? 'true' : 'false'}
//                             onChange={handleChange}
//                             autoComplete="off"
//                           >
//                             <option value="true">Ja</option>
//                             <option value="false">Nej</option>
//                           </select>
//                         </label>

//                         <button type="submit">Spara</button>
//                         <button type="button" onClick={handleCancel}>Avbryt</button>
//                       </form>
//                     </FadeInBox>
//                   ) : (
//                     <button onClick={() => setEditingUser(user)}>Redigera</button>
//                   )}
//                 </>
//               )}

//               <button onClick={() => navigate('/members')}>Medlemmar</button>
//             </FadeInBox>
//           </>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </SlideInBox>
//     </div>
//   );
// };

// export default UserPage;

