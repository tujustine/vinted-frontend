import React from "react";
import tear from "../assets/img/tear-cb30a259.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v2/offers`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span className="loading">En cours de chargement...</span>
  ) : (
    <>
      <div className="home-cover">
        <img src={tear} className="tear" />
        <div className="home-cover-container">
          <div className="ready-container">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="tri-articles">
          <div className="tri-par-prix">
            <span>Trier par prix : </span>
            <span>
              <input type="checkbox" />
            </span>
          </div>
          <div className="tri-range-prix">
            <p>Prix entre :</p>
            <span>
              <input
                type="range"
                id="prix"
                name="prix"
                min="0"
                max="500"
                step="5"
              />
            </span>
          </div>
        </div>
        {/* <div className="offers-wrapper"> */}
        <div className="all-offers">
          {data.offers.map((offer) => {
            return (
              <Link
                to={`/offer/${offer._id}`}
                key={offer._id}
                className="offer-link"
              >
                <div className="one-offer">
                  <div className="user">
                    <div>{offer.owner.account.username}</div>

                    {offer.owner.account.avatar ? (
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        className="avatar"
                      />
                    ) : (
                      <img className="without-avatar"></img>
                    )}
                  </div>

                  {/* TODO Changer en product_image quand je passerai à mon back */}
                  <div className="product-img-container">
                    <img
                      src={offer.product_pictures[0].secure_url}
                      className="product-img"
                    />
                  </div>
                  <div className="product-info">
                    <div>{offer.product_price} €</div>

                    {offer.product_details.map((details, index) => {
                      return (
                        <React.Fragment key={index}>
                          {details["MARQUE"] && <div>{details["MARQUE"]}</div>}
                        </React.Fragment>
                      );
                    })}

                    {offer.product_details.map((details, index) => {
                      return (
                        <React.Fragment key={index}>
                          {details["TAILLE"] && <div>{details["TAILLE"]}</div>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Home;
