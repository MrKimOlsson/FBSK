import { useState } from "react";
import { auth, db, firebaseConfig } from "../firebase"; // Import Firebase config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import '../index.css';

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Additional fields
  const [admin] = useState(false); // Set default to 'false' for new users
  const [bow, setBow] = useState("");
  const [joined] = useState(new Date().toLocaleString()); // Current timestamp
  const [payed] = useState(false); // Set default to 'false' for new users
  const [role] = useState("member"); // Set default to 'member'
  const [status, setStatus] = useState("");
  const [uid, setUid] = useState(""); // Will be set after registration

  const { role: userRole } = useAuth();

  if (userRole !== 'admin') {
    return <p>You do not have permission to access this page.</p>;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Use Firebase API key from firebaseConfig
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: false, // Prevents automatic login
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If the user is created successfully
        const userUid = data.localId;

        // Save user data to Firestore
        await setDoc(doc(db, "users", userUid), {
          email,
          admin,
          bow,
          firstname,
          lastname,
          joined,
          payed,
          role,
          status,
          uid: userUid,
        });

        alert("User registered successfully");
      } else {
        throw new Error(data.error.message || 'Something went wrong during registration.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Registrera ny medlem</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Förnamn"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Efternamn"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pilbåge"
          value={bow}
          onChange={(e) => setBow(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type="submit">Registrera</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;



// import { useState } from "react";
// import { auth, db } from "../firebase"; // Import Firestore database
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useAuth } from "../context/AuthContext";
// import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
// import '../index.css'

// function Register() {
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   // Additional fields
//   const [admin] = useState(true);
//   const [bow, setBow] = useState("");
//   // const [firstname] = useState("");
//   // const [lastname] = useState("");
//   const [joined] = useState(new Date().toLocaleString()); // Current timestamp
//   const [payed] = useState(true);
//   const [role] = useState("member");
//   const [status, setStatus] = useState("");
//   const [uid, setUid] = useState(""); // Will be set after registration

//   const { role: userRole } = useAuth();

//   if (userRole !== 'admin') {
//     return <p>You do not have permission to access this page.</p>;
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Create user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       setUid(user.uid);

//       // Save user data to Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email,
//         admin,
//         bow,
//         firstname,
//         lastname,
//         joined,
//         payed,
//         role,
//         status,
//         uid: user.uid,
//       });

//       alert("User registered successfully");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//       <input
//           type="text"
//           placeholder="Förnamn"
//           value={firstname}
//           onChange={(e) => setFirstname(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Efternamn"
//           value={lastname}
//           onChange={(e) => setLastname(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Lösenord"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Pilbåge"
//           value={bow}
//           onChange={(e) => setBow(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Status"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default Register;


