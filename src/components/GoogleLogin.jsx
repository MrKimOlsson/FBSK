// src/GoogleLogin.jsx
import { useState } from 'react';
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null); // Clear previous errors

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in: ", result.user);
      
      // Optionally navigate to another page on successful login
      navigate('/'); // Change '/home' to the route you want to navigate to
      
      alert("Logged in with Google successfully!");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setErrorMessage("Failed to log in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login with Google"}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default GoogleLogin;
