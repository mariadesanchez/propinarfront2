import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CheckoutCoto from '../CheckoutCoto';
import CheckoutVea from '../CheckoutVea';
import VideoCallRoom from './Component/VideoCallRoom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto, redirige a /checkout */}
        <Route path="/" element={<Navigate to="/checkout" />} />
        
        {/* Ruta para Checkout que renderiza ambos componentes con estilos */}
        <Route path="/checkout" element={<CheckoutContainer />} />
        
        {/* Ruta para VideoCallRoom */}
        <Route path="/video-call" element={<VideoCallRoom />} />
      </Routes>
    </Router>
  );
}

const CheckoutContainer = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
      <div style={{ flex: 1, maxWidth: '300px' }}>
        <CheckoutCoto />
      </div>
      <div style={{ flex: 1, maxWidth: '300px' }}>
        <CheckoutVea />
      </div>
      <div style={{ flex: 1, maxWidth: '80px' }}>
        {/* Ajusta maxWidth según tus preferencias */}
        <VideoCallRoom />
      </div>
    </div>
  );
};

export default App;



