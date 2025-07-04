import React from "react";
import { NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { CgMenuGridO } from "react-icons/cg";

const Navbar = () => {
  const links = (
    <>
      <li><NavLink to={'/'}> Home </NavLink></li>
      <li><NavLink to={'/about'}> About Us </NavLink></li>

    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <CgMenuGridO   className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <span className="btn btn-ghost text-xl"><ProFastLogo></ProFastLogo></span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
