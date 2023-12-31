/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CheckoutCoto from '../CheckoutCoto';
import CheckoutVea from '../CheckoutVea';

function App() {
 // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/checkout" />} />

        {/* Utiliza un contenedor flex para colocar CheckoutCoto y CheckoutVea uno al lado del otro */}
        <div style={{ display: 'flex' }}>
          <CheckoutCoto style={{ flex: 1, marginRight: '10px' }} />
          <CheckoutVea style={{ flex: 1 }} />
        </div>

        {/* Ruta para Rating */}
      </Routes>
    </Router>
  );
}

export default App;
