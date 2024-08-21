import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ZeroCountPage = () => {
  const { tableName } = useParams(); // Extract tableName from URL parameters
  const [zeroCount, setZeroCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchZeroCount = async () => {
      setLoading(true); // Start loading

      try {
        // Make API request
        const response = await axios.get(`http://localhost:8080/users/count-zero-values/${tableName}`);
        
        // Debugging: Log the full response
        console.log('API Response:', response);

        // Handle response if it's a plain number
        if (typeof response.data === 'number') {
          setZeroCount(response.data); // Directly set number if that's the response
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        // Handle and log errors
        if (axios.isAxiosError(err)) {
          setError(`Error: ${err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
        console.error('Error fetching zero count:', err);
      } finally {
        setLoading(false); // End loading
      }
    };

    // Ensure tableName is defined before fetching data
    if (tableName) {
      fetchZeroCount();
    } else {
      setError('Table name is missing');
      setLoading(false);
    }
  }, [tableName]);

  // Handler for the back button click
  const handleBackClick = () => {
    window.location.href = 'http://localhost:3000/tables'; // Redirect to the tables page
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
      <button className="btn btn-primary" onClick={handleBackClick}>Back to Table</button>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Zero Count for Table: {tableName}</h2>
          <p className="card-text">Zero Count: {zeroCount !== null ? zeroCount : 'No data available'}</p>
          <button className="btn btn-primary" onClick={handleBackClick}>Back to Table</button>
        </div>
      </div>
    </div>
  );
};

export default ZeroCountPage;
