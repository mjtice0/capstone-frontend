import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/accessibilityLogo.png";



const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="site-heading">
        <img src={logo} alt="accessibility-logo" className="logo"/>
      </Link>

      <ul>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/register">Register</CustomLink>
      </ul>
      {/* <i class="fa-solid fa-magnifying-glass"></i> */}
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  //set link in navbar to active, rerender only heading
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
