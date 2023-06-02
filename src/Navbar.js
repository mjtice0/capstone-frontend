import "./Navbar.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import logo from "./images/accessibilityLogo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./pages/login.css";

export default function Navbar() {
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  // const [currentUser, setCurrentUser] = useState(false);

  return (
    <nav className="navbar">
      <div className="navlogo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="buttons">
        <Link to="/login" className="loginButton">
          Login
        </Link>
        <Link to="/register" className="regButton">
          Register
        </Link>
      </div>
    </nav>
  );
}

/* <nav className="navbar">
<div className="navlogo">
  <img src={logo} alt="Logo" className="logo" />
</div>

{currentUser ? (
  <button className="logoutButton">Log out</button>
) : (
  <div className="buttons">
  <button className="loginButton" onClick={()=>{setShowLogin(true)}}>
    Login
  </button>
  <button className="registerButton" onClick={()=>{setShowRegister(true)}}>
    Register
  </button>
  </div>
)}
{showRegister && <Register setShowRegister={setShowRegister} />}
{showLogin && <Login setShowLogin={setShowLogin} />} */
