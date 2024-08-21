import React, { useState, useEffect } from 'react';
import { getUserById } from '../services/apiService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assuming you have userId from the login session
    const userId = 1; // Replace with actual logged-in user ID
    const fetchUser = async () => {
      const response = await getUserById(userId);
      setUser(response.data);
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default ProfilePage;
