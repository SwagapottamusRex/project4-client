import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>Hello world</h1>} />
      <Route path='/home' element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
