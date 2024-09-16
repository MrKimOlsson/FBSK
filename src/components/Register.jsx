import { useState } from "react";
import { auth, db } from "../firebase"; // Import Firestore database
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Additional fields
  const [admin] = useState(true);
  const [bow, setBow] = useState("");
  const [firstname] = useState("FBSK");
  const [lastname] = useState("Administratör");
  const [joined] = useState(new Date().toLocaleString()); // Current timestamp
  const [payed] = useState(true);
  const [role] = useState("member");
  const [status, setStatus] = useState("");
  const [uid, setUid] = useState(""); // Will be set after registration

  const { role: userRole } = useAuth();

  if (userRole !== 'admin') {
    return <p>You do not have permission to access this page.</p>;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUid(user.uid);

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        admin,
        bow,
        firstname,
        lastname,
        joined,
        payed,
        role,
        status,
        uid: user.uid,
      });

      alert("User registered successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bow"
          value={bow}
          onChange={(e) => setBow(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;


// // src/Register.jsx
// import { useState } from "react";
// import { auth } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useAuth } from "../context/AuthContext";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { role } = useAuth();

//   if (role !== 'admin') {
//     return <p>You do not have permission to access this page.</p>;
//   }
  
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("User registered successfully");
//     } catch (err) {
//       setError(err.message);
//     }
//   };


//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default Register;
