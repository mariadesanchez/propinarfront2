
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Checkout.css"; // Archivo CSS para estilos adicionales
import { useLocation } from "react-router-dom";



// Componente
const Checkout = () => {
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify([]));
  }, []);
  initMercadoPago(import.meta.env.VITE_PUBLICKEY_VEA, {
    locale: "es-AR",
  });

  const [preferenceId, setPreferenceId] = useState(null);
  const [unitPriceInput, setUnitPriceInput] = useState("");
  const [error, setError] = useState("");
  //para Generar el QR que se imprime
 
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
      const url_preference = "https://propinar-backe.vercel.app/create_preference";
   

      let response = await axios.post(url_preference, {
        items: [product],
        shipment_cost: 0,
      });

      const { id } = response.data;
   
      return id;
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    
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
   
    }
  }, [paramValue]);
  return (
    <>  
    {paramValueApproved ? (
      <>
        
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
   
      
        </div>
      </>):
    <div className="checkout-container">
      <img src="../images/Vea.png" alt="AvatarLucky" className="avatar-image" />
      {/* <h4 className="animated-text">Transfiriendo a...</h4> */}

      <h3>Supermercado Vea</h3>
      <TextField
        type="number"
        label="Importe a Pagar"
        variant="outlined"
        value={unitPriceInput}
        onChange={handlePriceChange}
        style={{ marginBottom: "10px" }}
        required
        error={error.length > 0}
        helperText={error}
      />
      {preferenceId ? (<Wallet initialization={{ preferenceId, redirectMode: "self" }} />):

      (<Button
        onClick={handleBuy}
        style={{ backgroundColor: "#009ee3", color: "#fff" }}
      >
        Pagar
      </Button>)}

   {/* <img src="../images/mantequeriaMp.png" alt="AvatarLucky" className="qr-image" /> */}

    </div>
    }
    </>
  );
};

export default Checkout;


 
  


