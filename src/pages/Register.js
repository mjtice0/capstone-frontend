import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./register.css";

export default function Register({ setShowRegister, setCurrentUser }) {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("http://localhost:8800/api/users/register", newUser);
      setRegistrationFailed(false);
      setRegistrationSuccess(true);
    } catch (err) {
      setRegistrationFailed(true);
    }
  };

  return (
    <div className="registerContainer">
      <h1>User Registration</h1>
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerButton">Register</button>
        {registrationSuccess && (
          <span className="success">Registration was successful!</span>
        )}
        {registrationFailed && (
          <span className="failure">Registration failed. Try again.</span>
        )}
      </form>
      <button
        className="cancelRegisterButton"
        onClick={() => setShowRegister(false)}
      >
        Cancel
      </button>
    </div>
  );
}
