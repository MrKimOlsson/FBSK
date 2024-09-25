import { useState } from "react";
import { auth, db, firebaseConfig } from "../firebase"; // Import Firebase config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import '../index.css';

function Apply() {
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
  const [role] = useState("applicant"); // Set default to 'applicant'
  const [status, setStatus] = useState("sökande");
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
        await setDoc(doc(db, "applications", userUid), {
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
      <h2>Du är nästan en av oss nu</h2>
      <p>Som en av oss får du tillgång till banan och kan logga in för att se kartan. Det sägs att en och annan stackare fortarande vandrar runt i skogarna än idag, så tänk inte på att försöka hitta utan kartan. Det är ett stort område och utan kartan kommer skogen att sväja dig hel. Vi behöver bara veta lite mer om dig.</p>

        <h3>När du har registrerat dig</h3>
        <p>Så kommer vi att ta hand om din ansökan i tur och ordning. När vi har motagit din betalning och registrerat ditt konto så får kommer du att få ett email om att allt är klart. Du kan då logga in på sidan och få tillgång till kartan. Du kommer även att bli inbjuden till vår Facebook grupp där du kan prata med oss medlemmar.</p>
      <h2>Ansök till att bli medlem</h2>
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
       
        <button type="submit">Ansök</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Apply;