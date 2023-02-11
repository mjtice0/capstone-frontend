import React from "react";

export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="name"
            placeholder="enter username"
            required
          />
        </div>

        <div className="input-containter">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="enter password"
            required
          />
        </div>
        <br />
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
