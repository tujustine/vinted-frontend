import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
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
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        userInfo
      );
      console.log(response.data);
      Cookies.set("userToken", response.data.token, { expires: 7 });
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      //   if (error.response.status === 409) {
      //     <div>Vous avez déjà un compte, veuillez vous connecter</div>;
      //   }
      console.log(error.response);
    }
  };

  return (
    <>
      <div>
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
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
          <div>
            <input
              type="checkbox"
              checked={userInfo.newsletter}
              name="newsletter"
              value={userInfo.newsletter}
              onChange={handleNewsletterChange}
            />
            <label htmlFor="newsletter"> S'inscrire à notre newsletter</label>
            <div>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </div>
          </div>
          <button type="submit">S'inscrire</button>
          <p>Tu as déjà un compte ? Connecte-toi !</p>
        </form>
      </div>
    </>
  );
};

export default Signup;
