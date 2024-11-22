import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        userInfo
      );
      console.log(response.data);
      Cookies.set("userToken", response.data.token, { expires: 7 });
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="login-container">
        <div>
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit} className="login">
            <input
              placeholder="Adresse email"
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

            <button type="submit">Se connecter</button>
          </form>
          <Link to={"/signup"} className="redirection-signup">
            Pas encore de compte ? Inscris-toi !
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
