import React, { useState } from 'react';
import { addUser } from '../services/apiService'; // Ensure this service handles the API call for signup
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignupPage.css'; // Add this to include custom CSS

const SignupPage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to validate the form inputs
  const validate = () => {
    const errors = {};

    if (!user.firstName) errors.firstName = 'First Name is required';
    if (!user.lastName) errors.lastName = 'Last Name is required';
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!user.email.includes('@')) {
      errors.email = 'Email must contain @';
    }
    if (!user.password) {
      errors.password = 'Password is required';
    } else if (user.password.length < 3) {
      errors.password = 'Password must be at least 3 characters';
    }
    if (!user.role) errors.role = 'Role is required';

    return errors;
  };

  // Function to handle the signup process
  const handleSignup = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await addUser(user); // Call the API service to add the user
        navigate('/login'); // Redirect to the login page on successful signup
      } catch (error) {
        alert('Signup failed');
      }
    }
  };

  // Function to handle redirection to login page
  const redirectToLogin = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
        <h2 className="text-center mb-4"><FaUserPlus /> Signup</h2>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><FaUser /></span>
            </div>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              placeholder="First Name"
            />
          </div>
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><FaUser /></span>
            </div>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              placeholder="Last Name"
            />
          </div>
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><FaEnvelope /></span>
            </div>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
          </div>
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><FaLock /></span>
            </div>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
          </div>
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group mb-4">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><FaUserTag /></span>
            </div>
            <select
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="DEVELOPER">Developer</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>
          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>
        <button onClick={handleSignup} className="btn btn-primary w-100">Signup <FaUserPlus /></button>
        <button onClick={redirectToLogin} className="btn btn-secondary w-100 mt-3">
          Go to Login <FaSignInAlt />
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
