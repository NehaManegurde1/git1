import React, { useEffect, useState } from 'react';
import userData from './usertable.json'; // Import the JSON file

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load the data from the JSON file
    setUsers(userData.users);
    setBlocks(userData.blocks);
    setCategories(userData.categories);
  }, []);

  return (
    <div className="container">
      <h2>User Table</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Block Table</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.id}>
              <td>{block.id}</td>
              <td>{block.name}</td>
              <td>{block.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Category Table</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
