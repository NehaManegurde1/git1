import React from 'react';
import{ useState, useEffect } from 'react';

function AdminHome() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos'); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          setData(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };


    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="ID">ID</th>
                        <th scope="First Name">First Name </th>
                        <th scope="Last Name">Last Name</th>
                        <th scope="Role">Role</th>
                        <th scope="Email">Email</th>
                        <th><button>Edit</button></th>
                        <th><button>Delete</button></th>
                    </tr> 
                </thead>
                <tbody>
                   <tr>
                    <td></td>
                   </tr>
                </tbody>
            </table>
            <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
        </div>
    )
}

export default AdminHome
