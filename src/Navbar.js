import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/accessibilityLogo.png";

export default function Navbar({ isLoggedIn, onLogout }) {
  const handleLogout = () => {
    // Implement the logout logic here (e.g., clear user token, reset state)
    onLogout(); // Call the onLogout function passed from App.js
  };

  return (
    <nav className="navbar">
      <div className="navlogo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="buttons">
        {isLoggedIn ? (
          <button className="loginButton" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login" className="loginButton">
              Login
            </Link>
            <Link to="/register" className="regButton">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

// import "./Navbar.css";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import logo from "./images/accessibilityLogo.png";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./pages/login.css";

// export default function Navbar() {
//   // const [showRegister, setShowRegister] = useState(false);
//   // const [showLogin, setShowLogin] = useState(false);
//   const [currentUser, setCurrentUser] = useState(false);

//   const handleLogout = () => {
//     setCurrentUser(null);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navlogo">
//         <Link to="/" className="logo-link">
//           <img src={logo} alt="Logo" className="logo" />
//         </Link>
//       </div>
//       <div className="buttons">
//         {currentUser ? (
//           <button className="loginButton" onClick={handleLogout}>
//             Log Out
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className="loginButton">
//               Login
//             </Link>
//             <Link to="/register" className="regButton">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
