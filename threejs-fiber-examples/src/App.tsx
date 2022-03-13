import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Example1 from './pages/Example1';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Example1" element={<Example1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
