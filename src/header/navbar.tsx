import logo from "../BrandLogo.svg";
import "./navbar.css";
import { Route, NavLink, Routes } from "react-router-dom";
import { menu } from "./pages";
import { JSX } from "react/jsx-runtime";
import { useMatch } from "react-router-dom";
import Home from "../pages/home";
import Biography from "../pages/biography";
import Affiliations from "../pages/affiliations";
import Testimonials from "../pages/testimonials";
import Booking from "../pages/booking";
import Blog from "../pages/blog";
import ContactForm from "../pages/contact";
import { useEffect, useState } from "react";
import { EventEmitter } from 'events';
import Projects from "../pages/projects";

const eventEmitter = new EventEmitter();

const MenuBar: JSX.IntrinsicAttributes | JSX.Element[] = [];
const Routing = [
  <Route key={0} path="/" Component={Home}></Route>,
  <Route key={1} path="/biography" Component={Biography}></Route>,
  <Route key={2} path="/projects" Component={Projects}></Route>,
  <Route key={3} path="/affiliations" Component={Affiliations}></Route>,
  <Route key={4} path="/testimonials" Component={Testimonials}></Route>,
  <Route key={5} path="/booking" Component={Booking}></Route>,
  <Route key={6} path="/blog" Component={Blog}></Route>,
  <Route key={7} path="/contact" Component={ContactForm}></Route>,
];

const handleClick = () => {
  eventEmitter.emit('customEvent', 'clicked');
};

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
          onClick={handleClick}
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
  useEffect(() => {
    const handleCustomEvent = (message: string) => {
      if (!!isMenuOpen) toggleMenu();
    };

    eventEmitter.on('customEvent', handleCustomEvent);

    // Cleanup on component unmount
    return () => {
      eventEmitter.off('customEvent', handleCustomEvent);
    };
  }, [isMenuOpen]);

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
