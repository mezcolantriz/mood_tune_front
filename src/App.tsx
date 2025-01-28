import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Profile } from './pages';

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken'); // Cambia según tu lógica de autenticación

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

