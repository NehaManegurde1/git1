import React, { useEffect, useState } from 'react';
import data from '../data/data.json';

const NullCount = () => {
  const [nullCount, setNullCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    // Function to count null and non-null values for all properties
    const countNullAndSuccess = () => {
      let nulls = 0;
      let successes = 0;

      data.users.forEach(user => {
        Object.keys(user).forEach(key => {
          if (user[key] === null || user[key] === undefined) {
            nulls += 1;
          } else {
            successes += 1;
          }
        });
      });

      setNullCount(nulls);
      setSuccessCount(successes);
    };

    countNullAndSuccess();
  }, []);

  return (
    <div className="container">
      <h2>Null and Success Count for All Properties</h2>
      <p>Null Count: {nullCount}</p>
      <p>Success Count: {successCount}</p>
    </div>
  );
};

export default NullCount;
