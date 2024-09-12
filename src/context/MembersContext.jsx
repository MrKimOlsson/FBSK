import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const MembersContext = createContext();

export const MembersProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Only fetch members if the user is authenticated
        const membersRef = collection(db, 'users');
        const unsubscribeMembers = onSnapshot(membersRef, (snapshot) => {
          const membersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          // Separate updated members into admins and non-admins
          const updatedAdmins = membersList.filter(member => member.admin);
          const updatedNonAdmins = membersList.filter(member => !member.admin);

          setMembers(updatedNonAdmins);
          setAdmins(updatedAdmins);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching members: ', error);
          setLoading(false);
        });

        return () => unsubscribeMembers(); // Clean up the subscription on unmount
      } else {
        setMembers([]);
        setAdmins([]);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [auth]);

  return (
    <MembersContext.Provider value={{ members, admins, setMembers, setAdmins, loading }}>
      {children}
    </MembersContext.Provider>
  );
};




// import React, { createContext, useState, useEffect } from 'react';
// import { db } from '../firebase';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// export const MembersContext = createContext();

// export const MembersProvider = ({ children }) => {
//   const [members, setMembers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         const membersRef = collection(db, 'users');
//         const unsubscribeMembers = onSnapshot(membersRef, (snapshot) => {
//           const allMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setMembers(allMembers.filter(member => member.role !== 'admin'));
//           setAdmins(allMembers.filter(member => member.role === 'admin'));
//           setLoading(false);
//         }, (error) => {
//           console.error('Error fetching members: ', error);
//           setLoading(false);
//         });

//         return () => unsubscribeMembers();
//       } else {
//         setMembers([]);
//         setAdmins([]);
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   return (
//     <MembersContext.Provider value={{ members, admins, setMembers, setAdmins, loading }}>
//       {children}
//     </MembersContext.Provider>
//   );
// };

