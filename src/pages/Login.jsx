import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({
  setIsLogin,
  visibleLogin,
  setVisibleLogin,
  setVisibleSignup,
  redirectToPublish,
  setRedirectToPublish,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event, key) => {
    const newObj = { ...userInfo };
    newObj[key] = event.target.value;
    setUserInfo(newObj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        userInfo
      );
      // console.log(response.data);
      Cookies.set("userToken", response.data.token, { expires: 7 });
      setIsLogin(true);
      setVisibleLogin(false);

      console.log(location.state);

      if (redirectToPublish) {
        navigate("/publish");
        setRedirectToPublish(false);
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("Identifiant ou mot de passe incorrect");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer !");
      }
    }
  };

  useEffect(() => {
    if (visibleLogin) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [visibleLogin]);

  return (
    <>
      <div className="login-container">
        <div
          className="modal-root"
          onClick={() => {
            setVisibleLogin(false);
          }}
        >
          <div
            className="modal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <h2>Se connecter</h2>
            {errorMessage && <span className="error">{errorMessage}</span>}
            <form onSubmit={handleSubmit} className="login">
              <input
                placeholder="Adresse email"
                type="email"
                name="email"
                value={userInfo.email}
                onChange={(event) => {
                  handleInputChange(event, "email");
                }}
              />
              <input
                placeholder="Mot de passe"
                type="password"
                name="username"
                value={userInfo.password}
                onChange={(event) => {
                  handleInputChange(event, "password");
                }}
              />

              <button type="submit">Se connecter</button>
            </form>
            <Link
              className="redirection-signup"
              onClick={() => {
                setVisibleSignup(true);
                setVisibleLogin(false);
              }}
            >
              Pas encore de compte ? Inscris-toi !
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
