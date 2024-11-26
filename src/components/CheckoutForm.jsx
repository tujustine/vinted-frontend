import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ title, price }) => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/payment`,
      {
        amount: price,
        title: title,
      }
    );
    const clientSecret = response.data.client_secret;
    console.log("ici =>", clientSecret);

    // récupérer tout le résultat du paiement
    const paymentResult = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirection
      redirect: "if_required",
    });

    if (paymentResult.error) {
      alert("Une erreur s'est produite");
    } else {
      alert("Tout s'est bien passé : vous êtes maintenant ruiné ! 😘");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={loading} className="pay-btn">
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
