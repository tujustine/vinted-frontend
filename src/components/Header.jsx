import vintedLogo from "../assets/img/logo-a7c93c98.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../pages/Login";

const Header = ({
  isLogin,
  setIsLogin,
  search,
  setSearch,
  setVisibleSignup,
  visibleSignup,
  setVisibleLogin,
  visibleLogin,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userToken");
    setIsLogin(false);
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
          <input
            type="text"
            placeholder="Recherche des articles"
            name="search-articles"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="three-btn">
          <div className="two-btn">
            {!isLogin ? (
              <>
                <button
                  className="inscription"
                  onClick={() => {
                    // navigate("/signup");
                    setVisibleSignup(!visibleLogin);
                  }}
                >
                  S'inscrire
                </button>
                <button
                  className="connexion"
                  onClick={() => {
                    // navigate("/login");
                    setVisibleLogin(!visibleLogin);
                  }}
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
          <button
            className="sell"
            onClick={() => {
              navigate("/publish");
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
