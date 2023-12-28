/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './App.css'
import Checkout from '../Checkout'
import { BrowserRouter as Router } from "react-router-dom";

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
    <>
     <Router>
     <Checkout />
     </Router>
     
     </>
  )
}

export default App;


