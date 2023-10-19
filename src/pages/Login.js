import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";
import "./register.css";
import jwt_decode from "jwt-decode";

export default function Login({ setShowLogin, setCurrentUser, setIsLoggedIn, myStorage }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

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

      setShowSuccess(true);

      // Clear the login form
      usernameRef.current.value = "";
      passwordRef.current.value = "";

      // Close the login form after a delay
      setTimeout(() => {
        setShowLogin(false);
      }, 2000);

    } catch (err) {
      console.error("Login error:", err);

      setLoginFailed(true);
    }
  };

  const handleLogout = () => {
    // Clear user token, reset states, and clear input fields
    localStorage.removeItem("userToken");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setShowSuccess(false);
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  // Reset the login form to its initial state
  const handleLoginClick = () => {
    setShowSuccess(false);
    setLoginFailed(false);
  };

  return (
    <div className="loginContainer">
      {showSuccess ? (
        <div className="loginSuccessMessage">Login Successful</div>
      ) : isLoggedIn ? (
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
              <button className="loginBtn" type="submit" onClick={handleLoginClick}>
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
