import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import '../styles/style.scss';
import Register from './auth/Register';
import CommunityIndex from './AllCommunity';
import Navbar from './Navbar';
import Login from './auth/Login';
import MyProfile from './Profile';
import CommunityNew from './CreateCommunity';
import CommunityEdit from './EditCommunity';
import CommunityCard from './CommunityPage';
import Thread from './ThreadCard';
import ThreadNew from './CreateThread';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<h1>Hello world</h1>} />
      <Route path='/home' element={<Home />} />
      <Route path='register' element={<Register />} />
      <Route path='community' element={<CommunityIndex />} />
      <Route path='login' element={<Login />} />
      <Route path='myprofile/' element={<MyProfile />} />
      <Route path='createcommunity' element={<CommunityNew />} />
      <Route path='editcommunity' element={<CommunityEdit />} />
      <Route path='community/:id' element={<CommunityCard />} />
      <Route path='thread/:id' element={<Thread />} />
      <Route path='createthread' element={<ThreadNew />} />
    </Routes>
  </BrowserRouter>
);

export default App;
