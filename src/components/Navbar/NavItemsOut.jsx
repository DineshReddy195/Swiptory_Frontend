import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavItemsOut = () => {
  return (
    <>
      <Link to="/?register=true">
        <button className='registerBtn'>Register</button>
      </Link>
      <Link to="/?signin=true">
        <button className='signinBtn'>Sign in</button>
      </Link>
    </>
  );
};

export default NavItemsOut;