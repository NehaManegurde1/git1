import React from 'react'
import userData from '../Data/usertable.json';
import { useEffect, useState } from 'react';

export default function UserDataValidate() {
    // nullcount
    const [selectedObject, setSelectedObject] = useState(null);
    const [nullCount, setNullCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);

    const handleTableSelect = (tableName) => {
        setSelectedTable(tableName);
        setTableData(userData[tableName] || []);

        const objects = userData[tableName];
        setSelectedObject(tableName);

        let nulls = 0;
        let successes = 0;

        objects.forEach(obj => {
            Object.keys(obj).forEach(key => {
                debugger
                if (obj[key] === "" || obj[key] === "null" || obj[key] === undefined) {
                    nulls += 1;
                } else {
                    successes += 1;
                }
            });
        });

        setNullCount(nulls);
        setSuccessCount(successes);


    };



    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Simulate fetching data from a JSON file
        const fetchUsers = () => {
            setUsers(userData);
        };

        fetchUsers(); // Call the function to set the users state
    }, []);
    console.log(users, "sd")
    return (
        <div>
            <h1>
                Data Validation
            </h1>
            <div class="container">
                <div className="container">
                    <h2>Select a Table</h2>
                    <ul className="list-group mb-4">
                        {userData.tables.map((table) => (
                            <li
                                key={table.id}
                                className="list-group-item"
                                onClick={() => handleTableSelect(table.name)}
                                style={{ cursor: 'pointer' }}
                            >
                                {table.name}
                            </li>
                        ))}
                    </ul>

                    {selectedTable && (
                        <>
                            <h3>{selectedTable} Table</h3>
                            {selectedTable === 'users' && (
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
                                        {tableData.map((user) => (
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
                            )}

                            {/* Add similar blocks for 'categories' and 'blogs' */}
                            {selectedTable === 'categories' && (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((category) => (
                                            <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>{category.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {selectedTable === 'blogs' && (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Author</th>
                                            <th>Category ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((blog) => (
                                            <tr key={blog.id}>
                                                <td>{blog.id}</td>
                                                <td>{blog.title}</td>
                                                <td>{blog.content}</td>
                                                <td>{blog.author}</td>
                                                <td>{blog.categoryId}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>

                <label htmlFor="">Tables</label>
                {/* {
    users.map((obj) => {
        console.log)
    })
} */}
                {/* {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))} */}

                {/* <select class="form-select" name='table'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select> */}

                <div>
                    <h2> Result :</h2>
                </div>
                <div>Count Positive : </div>
                <div>Neagtive Data :</div>

                {selectedObject && (
                    <>
                        <h3>{selectedObject.charAt(0).toUpperCase() + selectedObject.slice(1)} Object</h3>
                        <p>Null Count: {nullCount}</p>
                        <p>Success Count: {successCount}</p>
                    </>
                )}
            </div>
        </div>
    )
}
