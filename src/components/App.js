import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import '../styles/style.scss';
import Register from './auth/Register';
import CommunityIndex from './Community';
import Navbar from './Navabar';
import Login from './auth/Login';
import MyProfile from './Profile';

const App = () => (
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<h1>Hello world</h1>} />
      <Route path='/home' element={<Home />} />
      <Route path='register' element={<Register/>}/>
      <Route path='community' element={<CommunityIndex/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='myprofile' element={<MyProfile/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
