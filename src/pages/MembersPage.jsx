import React, { useState, useEffect, useContext } from 'react';
import { MembersContext } from '../context/MembersContext';
import { doc, getDoc } from 'firebase/firestore'; // Import for fetching role from Firestore
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../style/MemberPage.css';
import '../index.css';
import '../App.css';

const SlideInBox = React.lazy(() => import('../components/FramerMotion').then(module => ({ default: module.SlideInBox })));
const FadeInBox = React.lazy(() => import('../components/FramerMotion').then(module => ({ default: module.FadeInBox })));
const EditMemberForm = React.lazy(() => import('../components/EditMemberForm'));

const MembersPage = () => {
  const { members, admins, setMembers, setAdmins, loading } = useContext(MembersContext);
  const [editingMember, setEditingMember] = useState(null);
  const [userRole, setUserRole] = useState(null); // Store the role of the logged-in user
  const auth = getAuth();
  const navigate = useNavigate();

  // Fetch the role of the currently logged-in user
  useEffect(() => {
    const fetchUserRole = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role); // Set user role (e.g., 'admin' or 'member')
        }
      }
    };

    fetchUserRole();
  }, [auth]);

  // useEffect för att hantera medlemmar och admins endast vid förändring
  useEffect(() => {
    console.log('Rendering MembersPage with members:', members);
  }, [members, admins]);

  const handleCardClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SlideInBox>
        <FadeInBox>
          <div className='wrapper'>

          <div className="members-container">
            {loading ? (
              <p>Loading members...</p>
            ) : (
              <>
                {admins.length > 0 && (
                  <div>
                    <h2 className="margin-top">Administratörer</h2>
                    <ul className="members-list">
                      {admins.map((admin) => (
                        <li key={admin.id} className="member-item" onClick={() => handleCardClick(admin.id)}>
                          <p><strong>Namn:</strong> {admin.firstname && admin.lastname ? `${admin.firstname} ${admin.lastname}` : 'No name provided'}</p>
                          <p><strong>Epost:</strong> {admin.email || 'Ej angett'}</p>
                          <p className={admin.payed ? 'Betald' : 'Ej betald'}>
                            <strong>Medlemsavgift</strong> {admin.payed ? 'Betald' : 'Ej betald'}
                          </p>
                          {userRole === 'admin' && ( // Show edit button only if user is an admin
                            <button onClick={() => setEditingMember(admin)}>Redigera</button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {members.length > 0 && (
                  <div>
                    <h2>Medlemmar</h2>
                    <ul className="members-list">
                      {members.map((member) => (
                        <li key={member.id} className="member-item" onClick={() => handleCardClick(member.id)}>
                          <p><strong>Namn:</strong> {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : 'No name provided'}</p>
                          <p><strong>Epost:</strong> {member.email || 'Ej angett'}</p>
                          <p className={member.payed ? 'Betald' : 'Ej betald'}>
                            <strong>Medlemsavgift</strong> {member.payed ? 'Betald' : 'Ej betald'}
                          </p>
                          {userRole === 'admin' && ( // Show edit button only if user is an admin
                            <button onClick={() => setEditingMember(member)}>Redigera</button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {editingMember && (
              <React.Suspense fallback={<div>Loading form...</div>}>
                <EditMemberForm
                  member={editingMember}
                  setEditingMember={setEditingMember}
                  setMembers={setMembers}
                  setAdmins={setAdmins}
                />
              </React.Suspense>
            )}
          </div>
          </div>
        </FadeInBox>
      </SlideInBox>
    </React.Suspense>
  );
};

export default MembersPage;







// import React, { useState, useEffect, useContext } from 'react';
// import { MembersContext } from '../context/MembersContext';
// import { doc, updateDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { db } from '../firebase';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import '../style/MemberPage.css';
// import '../App.css';
// import {BoxComponent, FadeInBox, SlideInBox} from '../components/FramerMotion';
// const SlideInBox = React.lazy(() => import('../components/FramerMotion').then(module => ({default: module.SlideInBox})));
// const FadeInBox = React.lazy(() => import('../components/FramerMotion').then(module => ({default: module.FadeInBox})));

// const MembersPage = () => {
//   const { members, admins, setMembers, setAdmins, loading } = useContext(MembersContext);
//   const [editingMember, setEditingMember] = useState(null);
//   const [updatedMember, setUpdatedMember] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     payed: false,
//     admin: false,
//   });
//   const auth = getAuth();
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     console.log('Rendering MembersPage with members:', members);
//   }, [members, admins]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedValue = (name === 'payed' || name === 'admin') ? (value === 'true') : value;
//     setUpdatedMember(prev => ({
//       ...prev,
//       [name]: updatedValue,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingMember) return;

//     try {
//       const memberRef = doc(db, 'users', editingMember.id);

//       const updatedData = {
//         ...updatedMember,
//         payed: updatedMember.payed,
//         admin: updatedMember.admin
//       };

//       await updateDoc(memberRef, updatedData);
// 3
//       setMembers(prevMembers =>
//         prevMembers.map(member =>
//           member.id === editingMember.id ? { ...member, ...updatedData } : member
//         )
//       );

//       setAdmins(prevAdmins =>
//         prevAdmins.map(admin =>
//           admin.id === editingMember.id ? { ...admin, ...updatedData } : admin
//         )
//       );

//       setEditingMember(null);
//       setUpdatedMember({
//         firstname: '',
//         lastname: '',
//         email: '',
//         payed: false,
//         admin: false,
//       });

//     } catch (error) {
//       console.error('Error updating member: ', error.message);
//       alert('Error updating member. Please check the console for details.');
//     }
//   };

//   const handleCancel = () => {
//     setEditingMember(null);
//     setUpdatedMember({
//       firstname: '',
//       lastname: '',
//       email: '',
//       payed: false,
//       admin: false,
//     });
//   };

//   const handleCardClick = (id) => {
//     navigate(`/user/${id}`); // Navigate to UserPage with the member's id
//   };

//   return (
//     <React.Suspense fallback={<div>Loading...</div>}>
//     <SlideInBox> 
//       <FadeInBox>
    
//     <div className="members-container">
   
//       {loading ? (
//         <p>Loading members...</p>
//       ) : (
//         <>
//         {admins.length > 0 && (
//             <div>
//               <h2 className='margin-top'>Admins</h2>
//               <ul className="members-list">
//                 {admins.map((admin) => (
//                   <li key={admin.id} className="member-item" onClick={() => handleCardClick(admin.id)}>
//                     <p><strong>Namn:</strong> {admin.firstname && admin.lastname ? `${admin.firstname} ${admin.lastname}` : 'No name provided'}</p>
//                     <p><strong>Epost:</strong> {admin.email || 'Ej angett'}</p>
//                     {/* <p><strong>Medlem Sedan:</strong> {admin.joined ? new Date(admin.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p> */}
//                     <p className={admin.payed ? 'Betald' : 'Ej betald'}>
//                       <strong>Medlemsavgift</strong> {admin.payed ? 'Betald' : 'Ej betald'}
//                     </p>
//                     {/* <p><strong>Favorit pilbåge:</strong> {admin.bow || 'Ej angett'}</p> */}
//                     {/* <p><strong>Status:</strong> {admin.status || 'Medlem'}</p> */}
//                     <button onClick={() => {
//                       setEditingMember(admin);
//                       setUpdatedMember({
//                         firstname: admin.firstname || '',
//                         lastname: admin.lastname || '',
//                         email: admin.email || '',
//                         payed: admin.payed || false,
//                         admin: admin.admin || false,
//                       });
//                     }}>
//                       Redigera
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {members.length > 0 && (
//             <div>
//               <h2>Members</h2>
//               <ul className="members-list">
//                 {members.map((member) => (
//                   <li key={member.id} className="member-item" onClick={() => handleCardClick(member.id)}>
//                     <p><strong>Namn:</strong> {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : 'No name provided'}</p>
//                     <p><strong>Epost:</strong> {member.email || 'Ej angett'}</p>
//                     {/* <p><strong>Medlem Sedan:</strong> {member.joined ? new Date(member.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p> */}
//                     <p className={member.payed ? 'Betald' : 'Ej betald'}>
//                       <strong>Medlemsavgift</strong> {member.payed ? 'Betald' : 'Ej betald'}
//                     </p>
//                     {/* <p><strong>Favorit pilbåge:</strong> {member.bow || 'Ej angett'}</p> */}
//                     {/* <p><strong>Status:</strong> {member.status || 'Medlem'}</p> */}
//                     <button onClick={() => {
//                       setEditingMember(member);
//                       setUpdatedMember({
//                         firstname: member.firstname || '',
//                         lastname: member.lastname || '',
//                         email: member.email || '',
//                         payed: member.payed || false,
//                         admin: member.admin || false,
//                       });
//                     }}>
//                       Redigera
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}

//       {editingMember && (
//         <form onSubmit={handleSubmit} className="edit-member-form">
//           <h2>Redigera Member: {editingMember.firstname} {editingMember.lastname}</h2>

//           <label>
//             Förnamn:
//             <input
//               type="text"
//               name="firstname"
//               value={updatedMember.firstname}
//               onChange={handleChange}
//               required
//               autoComplete="given-name"
//               />
//           </label>

//           <label>
//             Efternamn:
//             <input
//               type="text"
//               name="lastname"
//               value={updatedMember.lastname}
//               onChange={handleChange}
//               required
//               autoComplete="family-name"
//               />
//           </label>

//           <label>
//             Epost:
//             <input
//               type="email"
//               name="email"
//               value={updatedMember.email}
//               onChange={handleChange}
//               required
//               autoComplete="email"
//               />
//           </label>

//           <label>
//             Medlemsavgift:
//             <select
//               name="payed"
//               value={updatedMember.payed ? 'true' : 'false'}
//               onChange={handleChange}
//               autoComplete="off"
//               >
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </label>

//           <label>
//             Administratör:
//             <select
//               name="admin"
//               value={updatedMember.admin ? 'true' : 'false'}
//               onChange={handleChange}
//               autoComplete="off"
//               >
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </label>

//           <button type="submit">Save</button>
//           <button type="button" onClick={handleCancel}>Cancel</button>
//         </form>
//       )}
//     </div>
//   {/* </BoxComponent> */}
//   </FadeInBox>
//   </SlideInBox>
//   </React.Suspense>
//   );
// };

// export default MembersPage;


