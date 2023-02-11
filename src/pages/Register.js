import React from "react";

export default function Register() {
  return (
    <div className="reg-container">
      <h1>User Registration</h1>
      <form>
        <label clasName="label">Name</label>
        <input className="input" value="name" type="text" />

        <label className="label">Email</label>
        <input className="input" value="name" type="email" />

        <label clasName="label">Passwrod</label>
        <input className="input" value="name" type="password" />
      </form>
    </div>
  );
}
