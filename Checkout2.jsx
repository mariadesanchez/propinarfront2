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
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify([]));
  }, []);

  initMercadoPago(import.meta.env.VITE_PUBLICKEY_1, {
    locale: "es-AR",
  });

  initMercadoPago(import.meta.env.VITE_PUBLICKEY_2, {
    locale: "es-AR",
  });

  const [preferenceId1, setPreferenceId1] = useState(null);
  const [preferenceId2, setPreferenceId2] = useState(null);
  const [unitPriceInput, setUnitPriceInput] = useState("");
  const [error, setError] = useState("");
  const [urlApp, setUrlApp] = useState("https://propinare.vercel.app");
  const [user, setUser] = useState("");

  const updateUser = () => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser || 'Lucky Snchz');
  };

  const createPreference = async (account) => {
    const unitPrice = parseFloat(unitPriceInput);

    if (isNaN(unitPrice) || unitPrice <= 0) {
      setError("El valor de la propina debe ser mayor a 0.");
      return null;
    } else {
      setError("");
    }

    const product = {
      title: "propina",
      unit_price: unitPrice,
      quantity: 1,
    };

    try {
      const url_preference = `https://propinar-backe.vercel.app/create_preference_${account}`;

      // Calcula el monto para la cuenta 2 (5% del unitPrice)
      const amountForAccount2 = unitPrice * 0.05;

      let response = await axios.post(url_preference, {
        items: [product],
        shipment_cost: 0,
        amountForAccount2: amountForAccount2, // Pasa el monto a la API
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleBuy = async () => {
    const id1 = await createPreference("1");
    const id2 = await createPreference("2");

    if (id1 && id2) {
      setPreferenceId1(id1);
      setPreferenceId2(id2);
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
      </>):
    <div className="checkout-container">
      <img src="../images/AvatarLucky.png" alt="AvatarLucky" className="avatar-image" />
      <h4 className="animated-text">Transfiriendo a...</h4>

      <h3>Lucky-Snchz</h3>
      <TextField
        type="number"
        label="Tu Propina"
        variant="outlined"
        value={unitPriceInput}
        onChange={handlePriceChange}
        style={{ marginBottom: "10px" }}
        required
        error={error.length > 0}
        helperText={error}
      />
      {preferenceId1 && preferenceId2 ? (
        <>
          <Wallet initialization={{ preferenceId: preferenceId1, redirectMode: "self" }} />
          <Wallet initialization={{ preferenceId: preferenceId2, redirectMode: "self" }} />
        </>) : (
        <Button
          onClick={handleBuy}
          style={{ backgroundColor: "#009ee3", color: "#fff" }}
        >
          Mi Propina
        </Button>
      )}
      <QRCodeGenerator urlApp={urlApp}/>
    </div>
    }
    </>
  );
};

export default Checkout;
