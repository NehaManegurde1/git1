import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/tables');
        setTables(response.data);
        if (response.data.length > 0) {
          setSelectedTable(response.data[0]); // Set the default selected table
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      if (selectedTable) {
        try {
          const response = await axios.get(`http://localhost:8080/users/tables/${selectedTable}`);
          setTableData(response.data);
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
      }
    };

    fetchTableData();
  }, [selectedTable]); // Use selectedTable as a dependency

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  // Handler for button click to navigate to a new URL
  const handleNullCountClick = () => {
    if (selectedTable) {
      navigate(`/count-null-values/${selectedTable}`);
    }
  };

  // Handler for zero-count button click
  const handleZeroCountClick = () => {
    if (selectedTable) {
      navigate(`/count-zero-values/${selectedTable}`);
    }
  };

  // Handler for button click to navigate to the admin dashboard
  const handleDashboardClick = () => {
    navigate('/admindashboard'); // Navigate to the admin dashboard
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={12} className="text-center">
          <h2>Select a Table</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="selectTable">
            <Form.Label>Select Table</Form.Label>
            <Form.Control as="select" value={selectedTable} onChange={handleTableChange}>
              {tables.map((table, index) => (
                <option key={index} value={table}>{table}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col md={4} className="d-flex justify-content-around">
          <Button variant="primary" onClick={handleNullCountClick}>
            Null Count
          </Button>
          <Button variant="warning" onClick={handleZeroCountClick}>
            Zero Count
          </Button>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col md={4} className="text-center">
          <Button variant="secondary" onClick={handleDashboardClick}>
            Go to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TablePage;
