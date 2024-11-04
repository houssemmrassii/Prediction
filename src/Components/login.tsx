import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../FirebaseConfig';
import './login.css'; // Adjusted styles
import googleLogo from './google.png'; // Google logo
import telecomLogo from './logo.png'; // Telecom logo

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard2'); // Redirect to dashboard2 after email/password login
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard2'); // Redirect to dashboard2 after Google login
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="form-title">Login</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              className="custom-input"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              className="custom-input"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="form-button">
            LOGIN
          </button>

          <div className="social-login">
            <button className="google-login-btn" onClick={handleGoogleSignIn}>
              <img src={googleLogo} alt="Google" className="google-icon" /> Sign in with Google
            </button>
          </div>

          <p className="text-center mt-3">
            Don't have an account? <a href="/register" className="link">Sign Up</a>
          </p>
        </form>
      </div>
      <img src={telecomLogo} alt="Telecom Logo" className="telecom-logo" />
    </div>
  );
}

export default Login;
