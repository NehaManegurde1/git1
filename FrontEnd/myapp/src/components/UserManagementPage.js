import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/apiService';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Container>
      <h2 className="my-4 text-center">User Management</h2>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/signup" className="btn btn-primary">Add New User</Link>
      </div>
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManagementPage;
