import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';

//http://localhost:3000/users/update/:2

const EditUserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserById(userId);
      setUser(response.data);
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await updateUser(user);
      navigate('/users');
    } catch (error) {
      alert('Update failed');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit User</h2>
      <input
        type="text"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <input
        type="text"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditUserPage;
