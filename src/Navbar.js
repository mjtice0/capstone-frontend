import React from "react";
import {  Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="site-heading">Site Heading</Link>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/reviews">Home</Link>
        </li>
        <li>
        <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;