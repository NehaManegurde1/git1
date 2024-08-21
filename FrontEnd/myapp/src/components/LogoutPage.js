import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import './LogoutPage.css'; // Add this to include custom CSS

const LogoutPage = () => {
  return (
    <div className="logout-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card logout-card text-center p-4 shadow-lg">
        <FaSignOutAlt size={60} className="mb-3 text-primary" />
        <h2 className="mb-3">Thank You!</h2>
        <p className="mb-4">We appreciate your time with us. Come back soon!</p>
        <Link to="/" className="btn btn-primary">Return to Home</Link> {/* Use Link for internal routing */}
      </div>
    </div>
  );
};

export default LogoutPage;
