/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Checkout.css"; // Archivo CSS para estilos adicionales
import QRCodeGenerator from './QRCodeGenerator'
import { useLocation } from "react-router-dom";
import Rating from './Rating'

// Componente
const Checkout = () => {
  initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
    locale: "es-AR",
  });

  const [preferenceId, setPreferenceId] = useState(null);
  const [unitPriceInput, setUnitPriceInput] = useState("");
  const [error, setError] = useState("");
  const [urlApp, setUrlApp] = useState("https://propinare.vercel.app");
  const [user, setUser] = useState("");
  const updateUser = () => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser || 'Lucky Snchz');
  };

  const createPreference = async () => {
    const unitPrice = parseFloat(unitPriceInput);

    if (isNaN(unitPrice) || unitPrice <= 0) {
      setError("El valor de la propina debe ser mayor a 0.");
      return;
    } else {
      setError("");
    }

    const product = {
      title: "propina",
      unit_price: unitPrice,
      quantity: 1,
    };

    try {
      const url_send_money = "https://propinar-backe.vercel.app/send_money"; // Cambia la URL según la configuración de tu servidor
      let response = await axios.post(url_send_money, {
        
        sender_email: "xul27@hotmail.com", // Cambia esto por el correo del remitente
        amount: 10,
      });

      const { payment_id } = response.data;
      return payment_id;
    } catch (error) {
      console.error("Error en createPreference:", error);
      setError("Error al enviar dinero. Por favor, inténtalo de nuevo más tarde.");
    }
    
  };

  const handleSendMoney = async () => {
    try {
      console.log("Clic en handleSendMoney");
      const paymentId = await createPreference();
      if (paymentId) {
        setPreferenceId(paymentId);
      }
    } catch (error) {
      console.error("Error en handleSendMoney:", error);
    }
  };
  

  const handlePriceChange = (event) => {
    setUnitPriceInput(event.target.value);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("status"); // approved --- reject
  const [paramValueApproved, setParamValueApproved] = useState(false);

  useEffect(() => {
    if (paramValue === "approved") {
      setParamValueApproved(true);
      updateUser();
    }
  }, [paramValue]);

  return (
    <>  
    {paramValueApproved ? (
      <>
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
          <Rating />
        </div>
      </>
    ) : (
      <div className="checkout-container">
        <img src="../images/AvatarLucky.png" alt="AvatarLucky" className="avatar-image" />
        <h4 className="animated-text">Transfiriendo a...</h4>
        <h3>Lucky-Snchz</h3>
        <TextField
          type="number"
          label="Monto a enviar"
          variant="outlined"
          value={unitPriceInput}
          onChange={handlePriceChange}
          style={{ marginBottom: "10px" }}
          required
          error={error.length > 0}
          helperText={error}
        />
        <Button
          onClick={handleSendMoney}
          style={{ backgroundColor: "#009ee3", color: "#fff" }}
        >
          Enviar Dinero
        </Button>
        {preferenceId && <Wallet initialization={{ preferenceId, redirectMode: "self" }} />}
        <QRCodeGenerator urlApp={urlApp}/>
      </div>
    )}
    </>
  );
};

export default Checkout;
