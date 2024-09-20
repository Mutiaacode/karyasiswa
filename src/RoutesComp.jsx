// RoutesComp.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin';
import Login from './Auth/Login';
import Logout from './Auth/Logout'; 
import Beranda from './Home/Beranda';
import DetailProject from './Home/DetailProject';
import Profile from './Home/Profile';
import Register from './Auth/Register'; 
import TambahProject from './Home/TambahProject'

function RoutesComp() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Beranda />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/detail/:id" element={<DetailProject />} />
        <Route path='/addproject' element={<TambahProject />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default RoutesComp;
