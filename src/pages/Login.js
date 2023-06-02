import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";
import "./register.css";

export default function Login({ setShowLogin, setCurrentUsername, myStorage }) {
  const [error, setError] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
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
      setCurrentUsername(res.data.username);
      myStorage.setItem("user", res.data.username);
      setShowLogin(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginHeading">Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="username" placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
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
      {error && <span className="error">Something went wrong!</span>}
    </div>
  );
}
