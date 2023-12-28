/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Checkout from '../Checkout';
import Rating from '../Rating';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    // Recuperar el valor del usuario desde el LocalStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <Router>
      <Routes>
        {/* Ruta por defecto, redirige a /checkout */}
        <Route path="/" element={<Navigate to="/checkout" />} />
        {/* Ruta para Checkout */}
        <Route path="/checkout" element={<Checkout user={user} />} />
        {/* Ruta para Rating */}
        <Route path="/rating" element={<Rating />} />
      </Routes>
    </Router>
  );
}

export default App;



