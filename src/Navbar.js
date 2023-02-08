
import {  Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="site-heading">Site Heading</Link>
      <ul>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
//set link in navbar to active, rerender only heading
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )


}

 
export default Navbar;