import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleLogin from '../components/GoogleLogin';
import '../style/LoginPage.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to /home
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <form className='loginForm' onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>

      <div className="googleLogin">
        <GoogleLogin />
      </div>
    </div>
  );
}

export default Login;


