import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v2/offers/${id}`
        );
        console.log(response.data);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchOffer();
  }, [id]);

  return isLoading ? (
    <span className="loading">En cours de chargement...</span>
  ) : (
    <div className="offer-container">
      <div className="offer">
        {/* <div className="offer-pictures"> */}
        {/* <img src={offer.product_image.secure_url} alt="article" /> */}
        {offer.product_pictures.map((article) => {
          return (
            <div key={article.asset_id} className="offer-picture">
              <img src={article.secure_url} className="d-block w-100" />
            </div>
          );
        })}
        {/* </div> */}

        <div className="offer-details">
          <p className="price">{offer.product_price}€</p>
          <div className="offer-infos">
            {offer.product_details.map((detail, index) => {
              const [key, value] = Object.entries(detail)[0];
              return (
                <ul key={index}>
                  <li>
                    <span className="key">{key}</span>{" "}
                    <span className="value">{value}</span>
                  </li>
                </ul>
              );
            })}
          </div>
          <hr className="hr-offer" />
          <p>{offer.product_name}</p>
          <p>{offer.product_description}</p>
          <div className="offer-user-info">
            {offer.owner.account.avatar ? (
              <img
                src={offer.owner.account.avatar.secure_url}
                className="avatar"
              />
            ) : (
              <img className="without-avatar"></img>
            )}
            <span>{offer.owner.account.username}</span>
          </div>
          <button className="buy">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
