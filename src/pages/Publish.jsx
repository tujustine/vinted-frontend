import { useState } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Publish = ({ isLogin, setVisibleLogin, visibleLogin }) => {
  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const [articleInfo, setArticleInfo] = useState({
    title: "",
    description: "",
    price: 0,
    condition: "",
    city: "",
    brand: "",
    size: 0,
    color: "",
    picture: null,
  });

  const token = Cookies.get("userToken");

  const handleArticleInfo = (event, key) => {
    const newObj = { ...articleInfo };
    newObj[key] = event.target.value;
    setArticleInfo(newObj);
  };

  return isLogin ? (
    <div className="publish-container-background">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form
          className="publish-article"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const formData = new FormData();

              for (const [key, value] of formData.entries()) {
                formData.append(key, value);
              }

              const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/offer/publish`,
                formData,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(response.data);
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          <div className="publish-pic-container">
            <div className="publish-pic-container-dotted">
              <input
                type="file"
                onChange={(event) => {
                  handleArticleInfo(event, "picture");
                }}
              />
            </div>
          </div>
          <div className="publish-title-container">
            <div>
              <label htmlFor="">Titre</label>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                value={articleInfo.title}
                onChange={(event) => {
                  handleArticleInfo(event, "title");
                }}
              />
            </div>
            <div>
              <label htmlFor="">Décris ton article</label>
              <input
                type="text"
                placeholder="ex: porté quelques fois, taille correctement"
                value={articleInfo.description}
                onChange={(event) => {
                  handleArticleInfo(event, "description");
                }}
              />
            </div>
          </div>
          <div className="publish-description-container">
            <div>
              <label htmlFor="">Marque</label>
              <input
                type="text"
                placeholder="ex: Zara"
                value={articleInfo.brand}
                onChange={(event) => {
                  handleArticleInfo(event, "brand");
                }}
              />
            </div>
            <div>
              <label htmlFor="">Taille</label>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                value={articleInfo.size}
                onChange={(event) => {
                  handleArticleInfo(event, "size");
                }}
              />
            </div>
            <div>
              <label htmlFor="">Couleur</label>
              <input
                type="text"
                placeholder="ex: Fushia"
                value={articleInfo.color}
                onChange={(event) => {
                  handleArticleInfo(event, "color");
                }}
              />
            </div>
            <div>
              <label htmlFor="">Etat</label>
              <input
                type="text"
                placeholder="Neuf avec étiquette"
                value={articleInfo.condition}
                onChange={(event) => {
                  handleArticleInfo(event, "condition");
                }}
              />
            </div>
            <div>
              <label htmlFor="">Lieu</label>
              <input
                type="text"
                placeholder="ex: Paris"
                value={articleInfo.city}
                onChange={(event) => {
                  handleArticleInfo(event, "city");
                }}
              />
            </div>
          </div>
          <div className="publish-price-container">
            <div>
              <label htmlFor="">Prix</label>
              <input
                type="text"
                placeholder="0,00 €"
                value={articleInfo.price}
                onChange={(event) => {
                  handleArticleInfo(event, "price");
                }}
              />
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">Je suis intéressé(e) par les échanges</label>
            </div>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  ) : (
    setVisibleLogin(!visibleLogin)
  );
};

export default Publish;
