import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({
  setIsLogin,
  visibleSignup,
  setVisibleSignup,
  visibleLogin,
  setVisibleLogin,
}) => {
  const navigate = useNavigate();
  const [missingParametersMessage, setMissingParametersMessage] =
    useState(null);
  const [existingEmail, setExistingEmail] = useState(null);
  const [otherError, setOtherError] = useState(null);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleInputChange = (event, key) => {
    const newObj = { ...userInfo };
    newObj[key] = event.target.value;
    setUserInfo(newObj);
  };

  const handleNewsletterChange = (event) => {
    const newObj = { ...userInfo };
    newObj.newsletter = event.target.checked;
    setUserInfo(newObj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMissingParametersMessage(null);
    setExistingEmail(null);
    setOtherError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        userInfo
      );
      console.log(response.data);
      Cookies.set("userToken", response.data.token, { expires: 7 });
      setIsLogin(true);
      setVisibleSignup(false);
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        setExistingEmail("Cette adresse email est déjà utilisée");
      } else if (error.response.data.message === "Missing parameters") {
        setMissingParametersMessage("Veuillez remplir tous les champs");
      } else {
        setOtherError("Une erreur est survenue, veuillez réessayer !");
      }
    }
  };

  useEffect(() => {
    if (visibleSignup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [visibleSignup]);

  return (
    <>
      <div className="signup-container">
        {/* <div> */}
        <div
          className="modal-root"
          onClick={() => {
            setVisibleSignup(false);
          }}
        >
          <div
            className="modal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {/* <div>
              <button
                onClick={() => {
                  setVisible(false);
                }}
                className="close"
              >
                X
              </button>
            </div> */}

            <h2>S'inscrire</h2>
            {otherError && <span className="error">{otherError}</span>}
            <form onSubmit={handleSubmit} className="signup">
              <input
                placeholder="Nom d'utilisateur"
                type="text"
                name="username"
                value={userInfo.username}
                onChange={(event) => {
                  handleInputChange(event, "username");
                }}
              />
              {missingParametersMessage && userInfo.username === "" && (
                <span className="error">{missingParametersMessage}</span>
              )}
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={userInfo.email}
                onChange={(event) => {
                  handleInputChange(event, "email");
                }}
              />
              {existingEmail && <span className="error">{existingEmail}</span>}
              {missingParametersMessage && userInfo.email === "" && (
                <span className="error">{missingParametersMessage}</span>
              )}

              <input
                placeholder="Mot de passe"
                type="password"
                name="username"
                value={userInfo.password}
                onChange={(event) => {
                  handleInputChange(event, "password");
                }}
              />
              {missingParametersMessage && userInfo.password === "" && (
                <span className="error">{missingParametersMessage}</span>
              )}
              <div className="checkbox-container">
                <div className="newsletter-checkbox">
                  <input
                    type="checkbox"
                    checked={userInfo.newsletter}
                    name="newsletter"
                    value={userInfo.newsletter}
                    onChange={handleNewsletterChange}
                    className="newsletter-input"
                  />
                  <span>S'inscrire à notre newsletter</span>
                </div>
                <p>
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </p>
              </div>
              <button type="submit">S'inscrire</button>
            </form>
            <Link
              // to={"/login"}
              className="redirection-login"
              onClick={() => {
                setVisibleSignup(false);
                setVisibleLogin(true);
              }}
            >
              Tu as déjà un compte ? Connecte-toi !
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Signup;
