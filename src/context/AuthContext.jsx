import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User Data from Firestore: ", userData); // Log the data fetched
            setRole(userData.role || 'member'); // Default to 'member' if no role is set
          } else {
            console.log("No user document found");
            setRole('member'); // Default role if no user document found
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
          setRole('member'); // Handle error by defaulting to 'member'
        }
        setUser(user);
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, [db]);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
