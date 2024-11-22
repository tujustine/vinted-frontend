import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleUsernameChange = (event) => {
    const newObj = { ...userInfo };
    newObj.username = event.target.value;
    setUserInfo(newObj);
  };

  const handleEmailChange = (event) => {
    const newObj = { ...userInfo };
    newObj.email = event.target.value;
    setUserInfo(newObj);
  };

  const handlePasswordChange = (event) => {
    const newObj = { ...userInfo };
    newObj.password = event.target.value;
    setUserInfo(newObj);
  };

  const handleNewsletterChange = (event) => {
    const newObj = { ...userInfo };
    newObj.newsletter = event.target.value;
    setUserInfo(newObj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        userInfo
      );
      console.log(response.data);
      Cookies.set("userToken", response.data.token, { expires: 7 });
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cette adresse email est déjà utilisée");
      }
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div>
          <h2>S'inscrire</h2>
          <form onSubmit={handleSubmit} className="signup">
            <input
              placeholder="Nom d'utilisateur"
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleUsernameChange}
            />
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleEmailChange}
            />
            <input
              placeholder="Mot de passe"
              type="password"
              name="username"
              value={userInfo.password}
              onChange={handlePasswordChange}
            />
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
          <Link to={"/login"} className="redirection-login">
            Tu as déjà un compte ? Connecte-toi !
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
