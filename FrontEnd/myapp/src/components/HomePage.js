import React, { useState } from 'react';
import './HomePage.css';
import { FaDatabase, FaLaptopCode, FaInfoCircle } from 'react-icons/fa';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const redirectToSignup = () => {
    window.location.href = 'http://localhost:3000/signup'; // Adjust the URL if needed
  };

  return (
    <Container fluid className="homepage-container text-center d-flex flex-column justify-content-center align-items-center">
      <Row className="align-items-center">
        <Col md={12} className="text-center">
          <h1 className="display-4"><FaLaptopCode /> Welcome to <span className="highlight">Data Prober</span></h1>
          <p className="lead description mt-4 mx-auto" style={{ maxWidth: '600px' }}>
            <FaDatabase className="icon" />
            Data Prober is a specialized web application crafted to streamline data analysis and management. Utilizing <strong>Spring Boot</strong> for robust backend development and <strong>React.js</strong> for a dynamic, responsive frontend, it offers a seamless user experience.
          </p>
          <Button variant="primary" size="lg" onClick={openModal} className="explore-button mt-5">
            <FaInfoCircle /> Explore Now
          </Button>
        </Col>
      </Row>

      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Future Scope</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled">
            <li>
              <strong>Expanding User Capabilities:</strong>
              <p>Details on expanding user capabilities.</p>
            </li>
            <li>
              <strong>Mobile and Cross-Platform Integration:</strong>
              <p>Details on mobile and cross-platform integration.</p>
            </li>
            <li>
              <strong>Intelligent Personalization:</strong>
              <p>Details on intelligent personalization.</p>
            </li>
            <li>
              <strong>Advanced Data Analytics:</strong>
              <p>Details on advanced data analytics.</p>
            </li>
            <li>
              <strong>Integration and Interoperability:</strong>
              <p>Details on integration and interoperability.</p>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={redirectToSignup}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
