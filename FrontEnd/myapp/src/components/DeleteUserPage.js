import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteUserPage = () => {
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/users/login/${userId}`);
      if (response.status === 200) {
        setSuccessMessage('User deleted successfully');
        setErrorMessage('');
        navigate('/users');
      } else {
        setErrorMessage('Failed to delete user');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(`Error occurred: ${error.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Delete User</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
        </div>
        <button onClick={handleDelete} className="btn btn-danger w-100 mt-3">Delete User</button>
      </div>
    </div>
  );
};

export default DeleteUserPage;
