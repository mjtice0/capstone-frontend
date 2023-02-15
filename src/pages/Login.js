
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">

      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      {/* <Cancel className="loginCancel" onClick={() => setShowLogin(false)} /> */}
    </div>
  );
}



// return (
//   <div className="login-container">
//     <h1>Login</h1>
//     <form>
//       <div className="input-container">
//         <label>Username </label>
//         <input
//           type="text"
//           name="name"
//           placeholder="enter username"
//           required
//         />
//       </div>

//       <div className="input-containter">
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           placeholder="enter password"
//           required
//         />
//       </div>
//       <br />
//       <div className="button-container">
//         <input type="submit" />
//       </div>
//     </form>
//   </div>
// );
