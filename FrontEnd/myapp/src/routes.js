import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserManagementPage from './components/UserManagementPage';
import EditUserPage from './components/EditUserPage';
import ProfilePage from './components/ProfilePage';
import AdminHome from './Admin/AdminHome';
import UserDataValidate from './components/UserDataValidate';
import UserListPage from './components/UserListPage';
import UpdateUserPage from './components/UpdateUserPage';
import DeleteUserPage from './components/DeleteUserPage';
import AdminDashboard from './components/AdminDashboard';
import TablePage from './components/TablePage';
import NullCountPage from './components/NullCountPage';
import ZeroCountPage  from './components/ZeroCountPage ';
import LogoutPage from './components/LogoutPage';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/users/edit/:userId" element={<EditUserPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/datavalidation" element={<UserDataValidate />} />
        <Route path="/userlist" element={<UserListPage />} />
        <Route path="/updateUser" element={<UpdateUserPage />} />
        <Route path="/deleteUser" element={<DeleteUserPage />} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/tables" element={<TablePage/>} />
        <Route path="/count-null-values/:tableName" element={<NullCountPage />} /> {/* Define the route */}
        <Route path="/count-zero-values/:tableName" element={<ZeroCountPage/>} /> {/* Define the route */}
        {/* <Route path="/usertable" element={<UserTable />} />  Added UserTable Route */}

        {/* <Route path="/d" element={<UserDataValidate />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
