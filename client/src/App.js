import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AddPage from './components/AddPage';
import ViewPage from './components/ViewPage';
import './App.css';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/add" element={<AddPage />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
