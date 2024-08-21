import axios from 'axios';

// Hardcoded API base URL
const API_BASE_URL = 'http://localhost:8080/users';

export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/login/getusers`);
};


export const addUser = (user) => {
  return axios.post(`${API_BASE_URL}/signup`, user);
};

export const updateUser = (user) => {
  return axios.put(`${API_BASE_URL}/login/update`, user);
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_BASE_URL}/login/${userId}`);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_BASE_URL}/login`, credentials);

};

export const logoutUser = () => {
  return axios.get(`${API_BASE_URL}/logout/getusers`);
};

export const getUserById = (userId) => {
  return axios.get(`${API_BASE_URL}/login/${userId}`);
};


export const fetchTables = () => {
  return axios.get(`${API_BASE_URL}/tables`);
};



