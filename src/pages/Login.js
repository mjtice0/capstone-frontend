import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./login.css";
import "./register.css";
import jwt_decode from "jwt-decode";

export default function Login({ setShowLogin, setCurrentUser, myStorage }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogout = () => {
    // Implement the logout logic here
    // For example, clear the user token from localStorage and reset the state
    localStorage.removeItem("userToken");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/login"); // Use navigate to redirect
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/users/login",
        user
      );

      const token = res.data.token;

      localStorage.setItem("userToken", token);

      const decodedToken = jwt_decode(token);
      setCurrentUser(decodedToken.username);

      setIsLoggedIn(true);

      console.log("Login successful");
      console.log("User:", decodedToken.username);
      console.log("Token:", token);

      navigate("/"); // Redirect to the homepage after successful login
    } catch (err) {
      console.error("Login error:", err);

      setLoginFailed(true);
    }
  };

  return (
    <div className="loginContainer">
      {isLoggedIn ? (
        <div>
          <p>Welcome, {currentUser}!</p>
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1 className="loginHeading">Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <input type="text" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <div className="buttonContainer">
              <button className="loginBtn" type="submit">
                Login
              </button>
              <button
                className="cancelLoginButton"
                onClick={() => setShowLogin(false)}
              >
                Cancel
              </button>
            </div>
          </form>
          {loginFailed && (
            <span className="error">Login failed. Check your credentials.</span>
          )}
        </div>
      )}
    </div>
  );
}

// import axios from "axios";
// import { useRef, useState } from "react";
// import "./login.css";
// import "./register.css";

// export default function Login({ setShowLogin, setCurrentUser, myStorage }) {
//   const [loginFailed, setLoginFailed] = useState(false);
//   const usernameRef = useRef();
//   const passwordRef = useRef();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const user = {
//       username: usernameRef.current.value,
//       password: passwordRef.current.value,
//     };
//     try {
//       const res = await axios.post(
//         "http://localhost:8800/api/users/login",
//         user
//       );
//       setCurrentUser(res.data.username);
//       myStorage.setItem("user", res.data.username);
//       setLoginFailed(false);
//       setShowLogin(false);
//     } catch (err) {
//       setLoginFailed(true);
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <h1 className="loginHeading">Login</h1>
//       <form onSubmit={handleLoginSubmit}>
//         <input type="text" placeholder="username" ref={usernameRef} />
//         <input type="password" placeholder="password" ref={passwordRef} />
//         <div className="buttonContainer">
//           <button className="loginBtn" type="submit">
//             Login
//           </button>
//           <button
//             className="cancelLoginButton"
//             onClick={() => setShowLogin(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//       {loginFailed && (
//         <span className="error">Login failed. Check your credentials.</span>
//       )}
//     </div>
//   );
// }
