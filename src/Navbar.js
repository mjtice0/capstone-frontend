import "./Navbar.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import logo from "./images/accessibilityLogo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navlogo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="./pages/Login.js">Login</a></li>
        <li><a href="./pages/Register">Register</a></li>
      </ul>
    </nav>
  );
}

