import React from "react";
import { NavLink } from "react-router";

const Header = ({ id }) => {
  return (
    <div>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to="/post">Add post</NavLink>
    </div>
  );
};

export default Header;
