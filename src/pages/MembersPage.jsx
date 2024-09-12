import React, { useState, useEffect, useContext } from 'react';
import { MembersContext } from '../context/MembersContext';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import '../style/MemberPage.css';
import '../App.css';

const MembersPage = () => {
  const { members, admins, setMembers, setAdmins, loading } = useContext(MembersContext);
  const [editingMember, setEditingMember] = useState(null);
  const [updatedMember, setUpdatedMember] = useState({
    firstname: '',
    lastname: '',
    email: '',
    payed: false,
    admin: false,
  });
  const auth = getAuth();

  useEffect(() => {
    console.log('Rendering MembersPage with members:', members);
  }, [members, admins]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = (name === 'payed' || name === 'admin') ? (value === 'true') : value;
    setUpdatedMember(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

// Assuming MembersContext provides setMembers and setAdmins
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!editingMember) return;

  try {
    const memberRef = doc(db, 'users', editingMember.id);

    const updatedData = {
      ...updatedMember,
      payed: updatedMember.payed,
      admin: updatedMember.admin
    };

    await updateDoc(memberRef, updatedData);

    // Update the context state
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === editingMember.id ? { ...member, ...updatedData } : member
      )
    );

    setAdmins(prevAdmins =>
      prevAdmins.map(admin =>
        admin.id === editingMember.id ? { ...admin, ...updatedData } : admin
      )
    );

    setEditingMember(null);
    setUpdatedMember({
      firstname: '',
      lastname: '',
      email: '',
      payed: false,
      admin: false,
    });

  } catch (error) {
    console.error('Error updating member: ', error.message);
    alert('Error updating member. Please check the console for details.');
  }
};


  

  const handleCancel = () => {
    setEditingMember(null);
    setUpdatedMember({
      firstname: '',
      lastname: '',
      email: '',
      payed: false,
      admin: false,
    });
  };

//   return (
//     <div>
//       <h1>Members List</h1>
//       {loading ? (
//         <p>Loading members...</p>
//       ) : (
//         <>

//         {admins.length > 0 && (
//                     <div>
//                       <h2>Admins</h2>
//                       <ul className="members-list">
//                         {admins.map((admin) => {
//                           // Ensure that `id` is unique and stable
//                           console.log('Rendering admin with key:', admin.id);
//                           return (
//                             <li key={admin.id} className="member-item">
//                               <p><strong>Name:</strong> {admin.firstname && admin.lastname ? `${admin.firstname} ${admin.lastname}` : 'No name provided'}</p>
//                               <p><strong>Email:</strong> {admin.email || 'No email provided'}</p>
//                               <p><strong>Medlem sedan:</strong> {admin.joined ? new Date(admin.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
//                               <p className={admin.payed ? 'paid' : 'unpaid'}>
//                                 <strong>Avgift:</strong> {admin.payed ? 'betald' : 'ej betald'}
//                               </p>
//                               <p><strong>Favorit båge:</strong> {admin.bow || 'Vet ej.'}</p>
//                               <p><strong>Status:</strong> {admin.status || 'Medlem'}</p>
//                               <button onClick={() => {
//                                 setEditingMember(admin);
//                                 setUpdatedMember({
//                                   firstname: admin.firstname || '',
//                                   lastname: admin.lastname || '',
//                                   email: admin.email || '',
//                                   payed: admin.payed || false,
//                                   admin: admin.admin || false,
//                                 });
//                               }}>
//                                 Edit
//                               </button>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     </div>
//                   )}
//                 </>
//               )}



        
//           {members.length > 0 && (
//             <div>
//               <h2>Members</h2>
//               <ul className="members-list">
//                 {members.map((member) => {
//                   // Ensure that `id` is unique and stable
//                   console.log('Rendering member with key:', member.id);
//                   return (
//                     <li key={member.id} className="member-item">
//                       <p><strong>Name:</strong> {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : 'No name provided'}</p>
//                       <p><strong>Email:</strong> {member.email || 'No email provided'}</p>
//                       <p><strong>Medlem sedan:</strong> {member.joined ? new Date(member.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
//                       <p className={member.payed ? 'paid' : 'unpaid'}>
//                         <strong>Avgift:</strong> {member.payed ? 'betald' : 'ej betald'}
//                       </p>
//                       <p><strong>Favorit båge:</strong> {member.bow || 'Vet ej.'}</p>
//                       <p><strong>Status:</strong> {member.status || 'Medlem'}</p>
//                       <button onClick={() => {
//                         setEditingMember(member);
//                         setUpdatedMember({
//                           firstname: member.firstname || '',
//                           lastname: member.lastname || '',
//                           email: member.email || '',
//                           payed: member.payed || false,
//                           admin: member.admin || false,
//                         });
//                       }}>
//                         Edit
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           )}


          

//       {editingMember && (
//         <form onSubmit={handleSubmit} className="edit-member-form">
//           <h2>Edit Member: {editingMember.firstname} {editingMember.lastname}</h2>

//           <label>
//             First Name:
//             <input
//               type="text"
//               name="firstname"
//               value={updatedMember.firstname}
//               onChange={handleChange}
//               required
//               autoComplete="given-name"
//             />
//           </label>

//           <label>
//             Last Name:
//             <input
//               type="text"
//               name="lastname"
//               value={updatedMember.lastname}
//               onChange={handleChange}
//               required
//               autoComplete="family-name"
//             />
//           </label>

//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={updatedMember.email}
//               onChange={handleChange}
//               required
//               autoComplete="email"
//             />
//           </label>

//           <label>
//             Membership Paid:
//             <select
//               name="payed"
//               value={updatedMember.payed ? 'true' : 'false'}
//               onChange={handleChange}
//               autoComplete="off"
//             >
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </label>

//           <label>
//             Admin:
//             <select
//               name="admin"
//               value={updatedMember.admin ? 'true' : 'false'}
//               onChange={handleChange}
//               autoComplete="off"
//             >
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </label>

//           <button type="submit">Save</button>
//           <button type="button" onClick={handleCancel}>Cancel</button>
//         </form>
//       )}
//     </div>
//   );
// };


return (
  <div className="members-container">
    {loading ? (
      <p>Loading members...</p>
    ) : (
      <>
        {admins.length > 0 && (
          <div>
            <h2 className='margin-top'>Admins</h2>
            <ul className="members-list">
              {admins.map((admin) => (
                <li key={admin.id} className="member-item">
                  <p><strong>Name:</strong> {admin.firstname && admin.lastname ? `${admin.firstname} ${admin.lastname}` : 'No name provided'}</p>
                  <p><strong>Email:</strong> {admin.email || 'No email provided'}</p>
                  <p><strong>Member Since:</strong> {admin.joined ? new Date(admin.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
                  <p className={admin.payed ? 'paid' : 'unpaid'}>
                    <strong>Fee:</strong> {admin.payed ? 'Paid' : 'Unpaid'}
                  </p>
                  <p><strong>Favorite Bow:</strong> {admin.bow || 'Not specified'}</p>
                  <p><strong>Status:</strong> {admin.status || 'Member'}</p>
                  <button onClick={() => {
                    setEditingMember(admin);
                    setUpdatedMember({
                      firstname: admin.firstname || '',
                      lastname: admin.lastname || '',
                      email: admin.email || '',
                      payed: admin.payed || false,
                      admin: admin.admin || false,
                    });
                  }}>
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {members.length > 0 && (
          <div>
            <h2>Members</h2>
            <ul className="members-list">
              {members.map((member) => (
                <li key={member.id} className="member-item">
                  <p><strong>Name:</strong> {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : 'No name provided'}</p>
                  <p><strong>Email:</strong> {member.email || 'No email provided'}</p>
                  <p><strong>Member Since:</strong> {member.joined ? new Date(member.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
                  <p className={member.payed ? 'paid' : 'unpaid'}>
                    <strong>Fee:</strong> {member.payed ? 'Paid' : 'Unpaid'}
                  </p>
                  <p><strong>Favorite Bow:</strong> {member.bow || 'Not specified'}</p>
                  <p><strong>Status:</strong> {member.status || 'Member'}</p>
                  <button onClick={() => {
                    setEditingMember(member);
                    setUpdatedMember({
                      firstname: member.firstname || '',
                      lastname: member.lastname || '',
                      email: member.email || '',
                      payed: member.payed || false,
                      admin: member.admin || false,
                    });
                  }}>
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )}

    {editingMember && (
      <form onSubmit={handleSubmit} className="edit-member-form">
        <h2>Edit Member: {editingMember.firstname} {editingMember.lastname}</h2>

        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={updatedMember.firstname}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={updatedMember.lastname}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={updatedMember.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </label>

        <label>
          Membership Paid:
          <select
            name="payed"
            value={updatedMember.payed ? 'true' : 'false'}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <label>
          Admin:
          <select
            name="admin"
            value={updatedMember.admin ? 'true' : 'false'}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    )}
  </div>
);
};

export default MembersPage;




























// import React, { useState, useEffect, useContext } from 'react';
// import { MembersContext } from '../context/MembersContext';
// import { doc, updateDoc, getDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { db } from '../firebase';
// import '../style/MemberPage.css';

// const MembersPage = () => {
//   const { members, admins, setMembers, setAdmins, loading } = useContext(MembersContext);
//   const [editingMember, setEditingMember] = useState(null);
//   const [updatedMember, setUpdatedMember] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     payed: false,
//     role: '',
//   });
//   const [userRole, setUserRole] = useState('');
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         try {
//           const userDoc = await getDoc(doc(db, 'users', user.uid));
//           if (userDoc.exists()) {
//             setUserRole(userDoc.data().role || '');
//           }
//         } catch (error) {
//           console.error('Error fetching user role: ', error);
//           alert('Error fetching user role. Check the console for details.');
//         }
//       }
//     };

//     fetchUserRole();
//   }, [auth.currentUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedValue = name === 'payed' ? (value === 'true') : value;
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
//       await updateDoc(memberRef, updatedMember);

//       // Update local state with new data
//       const updatedMembers = members.map(member =>
//         member.id === editingMember.id
//           ? { ...member, ...updatedMember }
//           : member
//       );
//       const updatedAdmins = admins.map(admin =>
//         admin.id === editingMember.id
//           ? { ...admin, ...updatedMember }
//           : admin
//       );

//       setEditingMember(null);
//       setUpdatedMember({
//         firstname: '',
//         lastname: '',
//         email: '',
//         payed: false,
//         role: '',
//       });

//       setMembers(updatedMembers); // Update context with the new members list
//       setAdmins(updatedAdmins);   // Update context with the new admins list
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
//       role: '',
//     });
//   };

//   return (
//     <div>
//       <h1>Members List</h1>
//       {loading ? (
//         <p>Loading members...</p>
//       ) : (
//         <>
//           <h2>Admins</h2>
//           {admins.length > 0 ? (
//             <ul className="members-list">
//               {admins.map((member) => (
//                 <li key={member.id} className="member-item">
//                   <p><strong>Name:</strong> {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : 'No name provided'}</p>
//                   <p><strong>Email:</strong> {member.email || 'No email provided'}</p>
//                   <p><strong>Medlem sedan:</strong> {member.joined ? new Date(member.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
//                   <p className={member.payed === true ? 'paid' : 'unpaid'}>
//                     <strong>Avgift:</strong> {member.payed === true ? 'betald' : 'ej betald'}
//                   </p>
//                   <p><strong>Roll:</strong> {member.role || 'No role specified'}</p>

//                   {userRole === 'admin' && (
//                     <button onClick={() => {
//                       setEditingMember(member);
//                       setUpdatedMember({
//                         firstname: member.firstname || '',
//                         lastname: member.lastname || '',
//                         email: member.email || '',
//                         payed: member.payed || false,
//                         role: member.role || '',
//                       });
//                     }}>
//                       Edit
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No admins found.</p>
//           )}

//           <h2>Members</h2>
//           {members.length > 0 ? (
//             <ul className="members-list">
//               {members.map((member) => (
//                 <li key={member.id} className="member-item">
//                   <p><strong>Name:</strong> {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : 'No name provided'}</p>
//                   <p><strong>Email:</strong> {member.email || 'No email provided'}</p>
//                   <p><strong>Medlem sedan:</strong> {member.joined ? new Date(member.joined.seconds * 1000).toLocaleDateString() : 'No membership info'}</p>
//                   <p className={member.payed === true ? 'paid' : 'unpaid'}>
//                     <strong>Avgift:</strong> {member.payed === true ? 'betald' : 'ej betald'}
//                   </p>
//                   <p><strong>Roll:</strong> {member.role || 'No role specified'}</p>

//                   {userRole === 'admin' && (
//                     <button onClick={() => {
//                       setEditingMember(member);
//                       setUpdatedMember({
//                         firstname: member.firstname || '',
//                         lastname: member.lastname || '',
//                         email: member.email || '',
//                         payed: member.payed || false,
//                         role: member.role || '',
//                       });
//                     }}>
//                       Edit
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No members found.</p>
//           )}

//           {editingMember && (
//             <form onSubmit={handleSubmit} className="edit-member-form">
//               <h2>Edit Member: {editingMember.firstname} {editingMember.lastname}</h2>

//               <label>
//                 First Name:
//                 <input
//                   type="text"
//                   name="firstname"
//                   value={updatedMember.firstname}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Last Name:
//                 <input
//                   type="text"
//                   name="lastname"
//                   value={updatedMember.lastname}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Email:
//                 <input
//                   type="email"
//                   name="email"
//                   value={updatedMember.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Role:
//                 <input
//                   type="text"
//                   name="role"
//                   value={updatedMember.role}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Membership Paid:
//                 <select
//                   name="payed"
//                   value={updatedMember.payed ? 'true' : 'false'}
//                   onChange={handleChange}
//                 >
//                   <option value="true">Yes</option>
//                   <option value="false">No</option>
//                 </select>
//               </label>

//               <button type="submit">Save</button>
//               <button type="button" onClick={handleCancel}>Cancel</button>
//             </form>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default MembersPage;
