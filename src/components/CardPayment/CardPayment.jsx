import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const CardPayment = () => {
  const [preferenceID, setpreferenceID] = useState(null);
  initMercadoPago("TEST-7363d557-fdcf-4462-b677-e5edc30fb58c", {
    locale: "es-CL",
  });

  const creatPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: "Ejemplo title",
          quantity: 1,
          price: 990,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log("Error de CardPayment Axios:" + error);
    }
  };

  const handleBuy = async () => {
    const id = await creatPreference();
    if (id) {
      creatPreference(id);
    }
  };

  return (
    <>
      <Button onClick={handleBuy}> Comprar</Button>
      {preferenceID && (
        <Wallet
          initialization={{ preferenceId: preferenceID }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </>
  );
};

export default CardPayment;
