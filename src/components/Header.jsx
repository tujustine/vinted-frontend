import vintedLogo from "../assets/img/logo-a7c93c98.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        <Link to={"/"}>
          <img src={vintedLogo} alt="logo vinted" className="logo" />
        </Link>
        <div className="search-container">
          <FaMagnifyingGlass style={{ color: "#BBBBBB" }} />
          <input type="text" placeholder="Recherche des articles" />
        </div>
        <div className="three-btn">
          <div className="two-btn">
            {!isLoggedIn ? (
              <>
                <button
                  className="inscription"
                  onClick={() => navigate("/signup")}
                >
                  S'inscrire
                </button>
                <button
                  className="connexion"
                  onClick={() => navigate("/login")}
                >
                  Se connecter
                </button>
              </>
            ) : (
              <button className="logout" onClick={handleLogout}>
                Se déconnecter
              </button>
            )}
          </div>
          <button className="sell">Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;