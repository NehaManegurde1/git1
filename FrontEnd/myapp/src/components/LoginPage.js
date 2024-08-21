import React, { useState } from 'react';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email must contain @ symbol and a valid domain');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      try {
        await loginUser({ email, password });
        navigate('/admindashboard'); // Redirect to admin dashboard after successful login
      } catch (error) {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 className="text-center mb-4"><FaSignInAlt /> Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="form-group mb-3">
            <label>Email:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaEnvelope /></span>
              </div>
              <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                placeholder="Enter your email"
              />
            </div>
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div className="form-group mb-4">
            <label>Password:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaLock /></span>
              </div>
              <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                placeholder="Enter your password"
              />
            </div>
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 login-button">Login <FaSignInAlt /></button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
