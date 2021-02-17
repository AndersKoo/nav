// Tools
import React from "react";
import "./Navbar.css";
import Logo from "../img/Logo.png";

function Navbar() {
  return (
    <div>
      <nav>
        <div className="logo">En tjeneste fra</div>
        <img className="nav-logo" src={Logo} alt="" />
      </nav>
    </div>
  );
}

export default Navbar;
