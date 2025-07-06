import React from "react";
import { NavLink } from "react-router"; 
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { CgMenuGridO } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, userLogout } = useAuth();

  const handleLogout = () => {
    userLogout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have been successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send A Parcel </NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/addRiter">Add Riter</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <CgMenuGridO className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <span className="btn btn-ghost text-xl">
            <ProFastLogo />
          </span>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-2">
          {!user ? (
            <NavLink to="/login" className="btn btn-sm btn-outline">
              Login
            </NavLink>
          ) : (
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full border"
                  title={user.displayName || "User"}
                />
              )}
              <button onClick={handleLogout} className="btn btn-sm btn-outline">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
