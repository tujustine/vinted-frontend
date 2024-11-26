import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// Components
import Header from "./components/Header";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [redirectToPublish, setRedirectToPublish] = useState(false);

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
        setVisibleLogin={setVisibleLogin}
        setRedirectToPublish={setRedirectToPublish}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              isLogin={isLogin}
              setVisibleLogin={setVisibleLogin}
              setRedirectToPublish={setRedirectToPublish}
            />
          }
        ></Route>
        <Route
          path="/offer/:id"
          element={
            <Offer isLogin={isLogin} setVisibleLogin={setVisibleLogin} />
          }
        ></Route>
        <Route
          path="/publish"
          element={
            <Publish isLogin={isLogin} setVisibleLogin={setVisibleLogin} />
          }
        ></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
      {visibleSignup && !isLogin && (
        <Signup
          setIsLogin={setIsLogin}
          visibleSignup={visibleSignup}
          setVisibleSignup={setVisibleSignup}
          setVisibleLogin={setVisibleLogin}
          redirectToPublish={redirectToPublish}
          setRedirectToPublish={setRedirectToPublish}
        />
      )}
      {visibleLogin && !isLogin && (
        <Login
          setIsLogin={setIsLogin}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
          setVisibleSignup={setVisibleSignup}
          redirectToPublish={redirectToPublish}
          setRedirectToPublish={setRedirectToPublish}
        />
      )}
    </Router>
  );
}

export default App;
