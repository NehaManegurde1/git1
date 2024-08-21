import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUserPage = () => {
  const [user, setUser] = useState({
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!user.id) errors.id = 'User ID is required';
    if (!user.firstName) errors.firstName = 'First Name is required';
    if (!user.lastName) errors.lastName = 'Last Name is required';
    if (!user.email.includes('@')) errors.email = 'Email must contain @';
    if (!user.role) errors.role = 'Role is required';

    return errors;
  };

  const handleUpdate = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.put(`http://localhost:8080/users/login/update`, user);
        
        if (response.status === 200) {
          navigate('/users');
        } else {
          setErrorMessage('Update failed');
        }
      } catch (error) {
        setErrorMessage(`Error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4"><FaUserEdit /> Update User</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.id ? 'is-invalid' : ''}`}
            value={user.id}
            onChange={(e) => setUser({ ...user, id: e.target.value })}
            placeholder="User ID"
          />
          {errors.id && <div className="invalid-feedback">{errors.id}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="First Name"
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            placeholder="Last Name"
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
        <div className="form-group">
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password (optional)"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.role ? 'is-invalid' : ''}`}
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            placeholder="Role"
          />
          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>
        <button onClick={handleUpdate} className="btn btn-primary w-100">Update User</button>
      </div>
    </div>
  );
};

export default UpdateUserPage;
