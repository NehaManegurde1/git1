import React, { useState, useEffect } from 'react';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Correct URL based on your backend controller
        const response = await fetch('http://localhost:8080/users/login/getusers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div className="container mt-5"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User List</h2>
      {users.length > 0 ? (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {user.firstName} {user.lastName} - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default UserListPage;
