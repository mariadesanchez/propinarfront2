/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CheckoutCoto from '../CheckoutCoto';
import CheckoutVea from '../CheckoutVea';

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
        
        {/* Ruta para Checkout que renderiza ambos componentes con estilos */}
        <Route path="/checkout" element={<CheckoutContainer />} />
        
        {/* Ruta para Rating */}
      </Routes>
    </Router>
  );
}

const CheckoutContainer = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1, maxWidth: '300px' }}>
        <CheckoutCoto />
      </div>
      <div style={{ flex: 1, maxWidth: '300px' }}>
        <CheckoutVea />
      </div>
    </div>
  );
};

export default App;

