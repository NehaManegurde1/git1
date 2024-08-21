import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import './NullCountPage.css'; // Import the custom CSS file

const NullCountPage = () => {
  const { tableName } = useParams();
  const [nullCount, setNullCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNullCount = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:8080/users/count-null-values/${tableName}`);
        
        console.log('API Response:', response);

        if (typeof response.data === 'number') {
          setNullCount(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Error: ${err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
        console.error('Error fetching null count:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tableName) {
      fetchNullCount();
    } else {
      setError('Table name is missing');
      setLoading(false);
    }
  }, [tableName]);

  const handleBackClick = () => {
    window.location.href = 'http://localhost:3000/tables';
  };

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
  
  if (error) return (
    <Container className="text-center mt-5">
      <Alert variant="danger" className="border border-danger">
        {error}
        <div className="mt-3">
          <Button variant="primary" onClick={handleBackClick}>Back to Table</Button>
        </div>
      </Alert>
    </Container>
  );

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center border rounded p-4 shadow-sm bg-light">
          <h2 className="mb-4">Null Count for Table: {tableName}</h2>
          <p className="lead mb-4">Null Count: {nullCount !== null ? nullCount : 'No data available'}</p>
          <Button variant="primary" onClick={handleBackClick}>Back to Table</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NullCountPage;
