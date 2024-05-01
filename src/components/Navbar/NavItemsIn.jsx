import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Navbar.css";
import avatar from "../../assets/avatar.png";
import hamburger from "../../assets/hamburger.png";
import cross from "../../assets/cross.png";

const NavItemsIn = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const isBookmarksActive = searchParams.get("viewbookmarks");

  return (
    <>
      <Link to="/?viewbookmarks=true">
        <button
          style={{
            border: isBookmarksActive
              ? "3px solid #085cff"
              : "3px solid transparent",
          }}
          className='bookmarkBtn'
        >
          Bookmarks
        </button>
      </Link>
      <Link to="/?addstory=true">
        <button className='addStoryBtn'>Add Story</button>
      </Link>
      <img className='avatar' src={avatar} alt="avatar" />
      <img
        className={`toggleIcon ${
          showMenu ? cross : hamburger
        }`}
        onClick={() => setShowMenu(!showMenu)}
        src={showMenu ? cross : hamburger}
        alt={showMenu ? "cross" : "hamburger"}
      />
      {showMenu && (
        <div className='menuSection'>
          <p>{localStorage.getItem("username")}</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("userId");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default NavItemsIn;