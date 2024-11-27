import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Icons
import { FaPlus } from "react-icons/fa6";

const Publish = ({ isLogin, setVisibleLogin }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState([]);

  const [articleInfo, setArticleInfo] = useState({
    title: "",
    price: 0,
    picture: [],
  });

  const token = Cookies.get("userToken");

  const handleArticleInfo = (event, key) => {
    const newObj = { ...articleInfo };
    newObj[key] = event.target.value;
    setArticleInfo(newObj);
  };

  const handleArticleInfoPicture = (event) => {
    const files = Array.from(event.target.files);
    const newPics = [...articleInfo.picture, ...files];
    const newPreview = files.map((file) => URL.createObjectURL(file));

    setArticleInfo({ ...articleInfo, picture: newPics });
    setPreview([...preview, ...newPreview]);
  };

  useEffect(() => {
    if (isLogin) {
      setVisibleLogin(false);
      navigate("/publish");
    } else {
      setVisibleLogin(true);
    }
  }, [isLogin, navigate, setVisibleLogin]);

  return (
    isLogin && (
      <div className="publish-container-background">
        <div className="publish-container">
          <h2>Vends ton article</h2>
          <form
            className="publish-article"
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const formData = new FormData();

                for (const [key, value] of Object.entries(articleInfo)) {
                  if (key === "picture") {
                    value.forEach((file) => formData.append("picture", file));
                  } else {
                    if (value !== "") {
                      formData.append(key, value);
                    }
                  }
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
                navigate(`/offer/${response.data._id}`);
                // console.log(response.data);
              } catch (error) {
                console.log(error.response);
              }
            }}
          >
            <div className="publish-pic-container">
              <div className="publish-pic-container-dotted">
                {preview.length > 0 ? (
                  <div className="publish-pics-and-label">
                    <div className="publish-pics">
                      {preview.map((pic, index) => {
                        return (
                          <img
                            key={index}
                            src={pic}
                            alt="Aperçu"
                            className="publish-pic-preview"
                          />
                        );
                      })}
                    </div>

                    <label
                      htmlFor="picture"
                      className={preview.length === 5 ? "disabled" : "add-pic"}
                    >
                      <FaPlus />
                      <span>Ajouter une photo (maximum 5)</span>
                    </label>

                    <input
                      disabled={preview.length === 5 ? "disabled" : ""}
                      type="file"
                      onChange={handleArticleInfoPicture}
                      className="hidden"
                      id="picture"
                    />
                  </div>
                ) : (
                  <>
                    <label htmlFor="picture" className="add-pic">
                      <i>
                        <FaPlus />
                      </i>
                      <span>Ajouter une photo (maximum 5)</span>
                    </label>
                    <input
                      type="file"
                      onChange={handleArticleInfoPicture}
                      className="hidden"
                      id="picture"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="publish-title-container">
              <div className="publish-articles-container">
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  placeholder="ex: Chemise Sézane verte"
                  value={articleInfo.title}
                  onChange={(event) => {
                    handleArticleInfo(event, "title");
                  }}
                />
              </div>
              <hr />
              <div className="publish-articles-container">
                <label htmlFor="description">Décris ton article</label>
                <textarea
                  placeholder="ex: porté quelques fois, taille correctement"
                  value={articleInfo.description}
                  onChange={(event) => {
                    handleArticleInfo(event, "description");
                  }}
                />
              </div>
            </div>
            <div className="publish-description-container">
              <div className="publish-articles-container">
                <label htmlFor="brand">Marque</label>
                <input
                  type="text"
                  placeholder="ex: Zara"
                  value={articleInfo.brand}
                  onChange={(event) => {
                    handleArticleInfo(event, "brand");
                  }}
                />
              </div>
              <hr />
              <div className="publish-articles-container">
                <label htmlFor="size">Taille</label>
                <input
                  type="text"
                  placeholder="ex: L / 40 / 12"
                  onChange={(event) => {
                    handleArticleInfo(event, "size");
                  }}
                />
              </div>
              <hr />
              <div className="publish-articles-container">
                <label htmlFor="color">Couleur</label>
                <input
                  type="text"
                  placeholder="ex: Fushia"
                  value={articleInfo.color}
                  onChange={(event) => {
                    handleArticleInfo(event, "color");
                  }}
                />
              </div>
              <hr />
              <div className="publish-articles-container">
                <label htmlFor="condition">Etat</label>
                <input
                  type="text"
                  placeholder="Neuf avec étiquette"
                  value={articleInfo.condition}
                  onChange={(event) => {
                    handleArticleInfo(event, "condition");
                  }}
                />
              </div>
              <hr />
              <div className="publish-articles-container">
                <label htmlFor="city">Lieu</label>
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
              <div className="publish-articles-container">
                <label htmlFor="price">Prix</label>
                <div className="price-and-checkbox">
                  <input
                    type="number"
                    placeholder="0,00 €"
                    onChange={(event) => {
                      handleArticleInfo(event, "price");
                    }}
                  />
                  <div className="checkbox-echanges publish-articles-container">
                    <input type="checkbox" className="checkbox-input" />
                    <label htmlFor="checkbox">
                      Je suis intéressé(e) par les échanges
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-btn-container">
              <button>Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Publish;
