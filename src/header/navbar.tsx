import logo from "../BrandLogo.svg";
import "./navbar.css";
import { Route, NavLink, Routes } from "react-router-dom";
import { menu } from "./pages";
import { JSX } from "react/jsx-runtime";
import { useMatch } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Affiliations from "../pages/affiliations";
import Testimonials from "../pages/testimonials";
import Booking from "../pages/booking";
import Blog from "../pages/blog";
import Contact from "../pages/contact";
import { useState } from "react";

const MenuBar: JSX.IntrinsicAttributes | JSX.Element[] = [];
const Routing = [
  <Route key={0} path="/" Component={Home}></Route>,
  <Route key={1} path="/about" Component={About}></Route>,
  <Route key={2} path="/affiliations" Component={Affiliations}></Route>,
  <Route key={3} path="/testimonials" Component={Testimonials}></Route>,
  <Route key={4} path="/booking" Component={Booking}></Route>,
  <Route key={5} path="/blog" Component={Blog}></Route>,
  <Route key={6} path="/contact" Component={Contact}></Route>,
];

menu
  .filter((entry) => entry.visibility)
  .sort((a, b) => a.index - b.index)
  .forEach((menuItem) => {
    MenuBar.push(
      <li key={menuItem.index}>
        <NavLink
          to={menuItem.name}
          className={({ isActive }) =>
            `navbar-item ${isActive ? "active" : ""}`
          }
        >
          {menuItem.name.toUpperCase()}
        </NavLink>
      </li>
    );
  });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const match = useMatch("/");
  const toggler = isMenuOpen ? "x" : "☰";
  return (
    <>
      <nav className="navbar">
        <div className="toggler-container">
          <button className="navbar-toggle" onClick={toggleMenu}>
            {toggler}
          </button>
          <div className={`navbar-container ${isMenuOpen ? "open" : ""}`}>
            <ul className="navbar-links">{MenuBar}</ul>
          </div>
        </div>

        {!match && (
          <div className="navbar-logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
        )}
      </nav>

      <Routes>{Routing}</Routes>
    </>
  );
};

export default Navbar;
