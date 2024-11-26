import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Components
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;
  const fraisLivraison = 4;
  const fraisAcheteur = price * 0.05;

  const options = {
    mode: "payment",
    amount: price * 100,
    currency: "eur",
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form">
        <div className="summary">
          <p className="payment-title">Résumé de la commande</p>
          <div className="payment-summary">
            <div>
              <span>Commande</span>
              <span>{price} €</span>
            </div>
            <div>
              <span>Frais protection acheteurs</span>
              <span>{fraisAcheteur.toFixed(2)} €</span>
            </div>
            <div>
              <span>Frais de port</span>
              <span>{fraisLivraison.toFixed(2)} €</span>
            </div>
          </div>

          <hr className="hr-payment" />

          <div className="payment-total">
            <span>Total</span>
            <span>{Number(price + fraisAcheteur + fraisLivraison)} €</span>
          </div>
        </div>

        <div className="card-payment">
          <div>
            <div>
              Il ne vous reste plus qu'un étape pour vous offrir{" "}
              <span className="bold">{title}</span>. Vous allez payer
              <span className="bold">
                {" "}
                {Number(price + fraisAcheteur + fraisLivraison)} €
              </span>
              (frais de protection et frais de port inclus).
            </div>
            <hr className="hr-payment" />
            <div>
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm price={price} title={title} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
