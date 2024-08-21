import React from 'react';
import './AdminDashboard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook to get the navigate function

  // Handler functions for button clicks
  const handleUserEditingClick = () => {
    navigate('/users'); // Navigate to the UserManagementPage
  };

  const handleDataValidationClick = () => {
    console.log('Data Validation clicked');
    navigate('/tables'); // Navigate to the TablePage
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
    navigate('/logout'); // Navigate to the logout page
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Dashboard</h1> {/* Add a heading here */}
      <button
        className="button user-editing-button"
        onClick={handleUserEditingClick}
      >
        User Editing
      </button>
      <button
        className="button data-validation-button"
        onClick={handleDataValidationClick}
      >
        Data Validation
      </button>
      <button
        className="button logout-button"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
