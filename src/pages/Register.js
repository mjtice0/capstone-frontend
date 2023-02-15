import { useState, useRef } from "react";
import axios from "axios";
import"./register.css";

export default function Register({setShowRegister}) {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleRegisterSubmit = async(event) => {
    event.preventDefault();
    const newUser = {
      username:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
    };
    try {
      await axios.post("http://localhost:8800/api/users/register", newUser);
      setLoginFailed(false);
      setLoginSuccess(true);
    } catch (err) {
      setLoginFailed(true);
    }
  };

  return (
    <div className="registerContainer">
      <h1>User Registration</h1>
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef}/>
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="rgtButton">Register</button>
        {loginSuccess && (
        <span className="success">Login was successful!</span>
        )} {loginFailed &&
        <span className="failure">Login failed. Something went wrong</span>
        }
      </form>
      <button className="cancelButton" onClick={()=>setShowRegister(false)}>Cancel</button>
    </div>
  );
}
