import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("userToken")) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Router>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        search={search}
        setSearch={setSearch}
        setVisibleSignup={setVisibleSignup}
        visibleSignup={visibleSignup}
        setVisibleLogin={setVisibleLogin}
        visibleLogin={visibleLogin}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        {/* <Route
          path="/signup"
          element={<Signup setIsLogin={setIsLogin} />}
        ></Route> */}
        {/* <Route
          path="/login"
          element={<Login setIsLogin={setIsLogin} />}
        ></Route> */}
      </Routes>
      <Footer />
      {visibleSignup && (
        <Signup
          setIsLogin={setIsLogin}
          visibleSignup={visibleSignup}
          setVisibleSignup={setVisibleSignup}
        />
      )}
      {visibleLogin && (
        <Login
          setIsLogin={setIsLogin}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
        />
      )}
    </Router>
  );
}

export default App;
