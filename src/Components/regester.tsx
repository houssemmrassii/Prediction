import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import telecomLogo from './logo.png'; // Import the telecom logo
import './login.css'; // Use the same CSS as login for consistency

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/prediction-form'); // Navigate to the dashboard after successful registration
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <img src={telecomLogo} alt="Telecom Logo" className="telecom-logo" /> {/* Telecom logo */}
      <div className="login-container">
        <h2 className="form-title">Register</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              className="custom-input"
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              className="custom-input"
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              className="custom-input"
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              className="custom-input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              className="custom-input"
              type="password"
              value={repeatPassword}
              placeholder="Repeat Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="form-button">
            REGISTER
          </button>

          <p className="text-center mt-3">
            Already have an account? <a href="/login" className="link">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
