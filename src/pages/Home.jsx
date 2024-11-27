import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Img
import smallVinted from "../assets/img/logo_vinted_small.png";
import tear from "../assets/img/tear-cb30a259.svg";

// Components
import PriceRange from "../components/PriceRange";
import SwitchExample from "../components/SwitchExample";

const Home = ({ search, setVisibleLogin, isLogin, setRedirectToPublish }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [minMaxPrice, setMinMaxPrice] = useState([0, 500]);
  const [sort, setSort] = useState(false);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const limitValues = [20, 60, 120];

  const navigate = useNavigate();

  const paginationButtons = () => {
    const totalPages = Math.ceil(data.count / limit);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          onClick={() => setPage(i)}
          className={page === i ? "active" : "desactivate"}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const updateLimit = (newLimit) => {
    setLimit(newLimit);
    const newTotalPages = Math.ceil(data.count / newLimit);
    if (page > newTotalPages) {
      setPage(1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v2/offers`,
          {
            params: {
              title: search,
              priceMin: minMaxPrice[0],
              priceMax: minMaxPrice[1],
              sort: sort ? "price-desc" : "price-asc",
              limit: limit,
              page: page,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, minMaxPrice, sort, limit, page]);

  return isLoading ? (
    <div className="loading-container rotating">
      <img src={smallVinted} />
    </div>
  ) : (
    <>
      <div className="home-cover">
        <img src={tear} className="tear" />
        <div className="home-cover-container">
          <div className="ready-container">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button
              onClick={() => {
                if (isLogin) {
                  navigate("/publish");
                } else {
                  setVisibleLogin(true);
                  setRedirectToPublish(true);
                }
              }}
            >
              Commencer à vendre
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tri-and-limit">
          <div className="tri-articles">
            <div className="tri-par-prix">
              <SwitchExample
                onChange={() => setSort(!sort)}
                name="Tri par prix : "
              />
            </div>
            <div className="tri-range-prix">
              <p>Prix entre :</p>
              <PriceRange
                minMaxPrice={minMaxPrice}
                setMinMaxPrice={setMinMaxPrice}
              />
            </div>
          </div>
          <div className="limit">
            <span>Produits par page </span>
            {limitValues.map((limitValue) => (
              <button
                key={limitValue}
                onClick={() => updateLimit(limitValue)}
                className={limit === limitValue ? "active" : "desactivate"}
              >
                {limitValue}
              </button>
            ))}
          </div>
        </div>

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

                  <div className="product-img-container">
                    <img
                      src={offer.product_pictures[0].secure_url}
                      className="product-img"
                    />
                  </div>
                  <div className="product-info">
                    <div className="product-info-price">
                      {offer.product_price} €
                    </div>

                    {offer.product_details.map((details, index) => {
                      return (
                        <React.Fragment key={index}>
                          {details["MARQUE"] && (
                            <div className="product-info-marque">
                              {details["MARQUE"]}
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}

                    {offer.product_details.map((details, index) => {
                      return (
                        <React.Fragment key={index}>
                          {details["TAILLE"] && (
                            <div className="product-info-taille">
                              {details["TAILLE"]}
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pagination">{paginationButtons()}</div>
      </div>
    </>
  );
};

export default Home;
