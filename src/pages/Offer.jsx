import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import smallVinted from "../assets/img/logo_vinted_small.png";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === offer.product_pictures.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? offer.product_pictures.length - 1 : slide - 1);
  };

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
    <div className="loading-container rotating">
      <img src={smallVinted} />
    </div>
  ) : (
    <div className="offer-container">
      <div className="offer">
        <div className="offer-pictures">
          {/* <img src={offer.product_image.secure_url} alt="article" /> */}
          <SlArrowLeft className="arrow arrow-left" onClick={prevSlide} />
          {offer.product_pictures.map((article, index) => {
            return (
              <img
                src={article.secure_url}
                key={article.asset_id}
                className={slide === index ? "slide" : "slide slide-hidden"}
              />
            );
          })}
          <SlArrowRight className="arrow arrow-right" onClick={nextSlide} />
          <span className="indicators">
            {offer.product_pictures.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSlide(index);
                  }}
                  className={
                    slide === index
                      ? "indicator"
                      : "indicator indicator-inactive"
                  }
                ></button>
              );
            })}
          </span>
        </div>

        <div className="offer-details">
          <p className="price">{offer.product_price}€</p>
          <div className="offer-infos">
            {offer.product_details.map((detail, index) => {
              for (const [key, value] of Object.entries(detail)) {
                return (
                  value !== "undefined" &&
                  value !== "" &&
                  value !== "none" && (
                    <ul key={index}>
                      <li>
                        <span>{key}</span>
                        <span>{value}</span>
                      </li>
                    </ul>
                  )
                );
              }
            })}
          </div>
          <hr className="hr-offer" />
          <p className="offer-name">{offer.product_name}</p>
          <p className="offer-description">{offer.product_description}</p>
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
