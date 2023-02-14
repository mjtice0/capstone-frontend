import "./Navbar.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import logo from "./images/accessibilityLogo.png";
import { useState } from "react";

export default function Navbar() {

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <nav className="navbar">
      <div className="navlogo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        {/* <li><a href="./pages/Login.js">Login</a></li>
        <li><a href="./pages/Register">Register</a></li> */}
        
      {currentUser ? (
        <button className="logoutButton">Log out</button>
      ) : (
        <div classNamme="buttons">
        <button className="loginButton" onClick={()=>{setShowLogin(true)}}>
          Login
        </button>
        <button className="registerButton" onClick={()=>{setShowRegister(true)}}>
          Register
        </button>
        </div>
      )}
      </ul>
    </nav>
  );
}

