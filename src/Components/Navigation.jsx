/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../CSS/Navigation.css";
import Logo from "../assets/Logo/logo.png";
import user from "../assets/user.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { UserDropdown } from "./UserDropdown";

const Navigation = () => {
  const { isloggedIn } = useAuth();
  const [open, setOpen] = useState(true);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  console.log(open);

  return (
    <div className="position-relative">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a
            className="navbar-brand d-flex justify-content-center align-items-center"
            href="#"
          >
            <img
              src={Logo}
              alt="Logo"
              className="d-inline-block align-text-top nav-logo me-3"
            />
            <span className="nav-brand-title">
              Straight Drive Sports & Leisure Pvt Ltd
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="offcanvas offcanvas-start sidebar"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <a
                className="navbar-brand d-flex justify-content-center align-items-center"
                href="#"
              >
                <img
                  src={Logo}
                  alt="Logo"
                  className="d-inline-block align-text-top nav-logo me-3"
                />
                <span className="nav-brand-title">Straight Drive</span>
              </a>
              <button
                type="button"
                className="btn-close btn-close-black text-center me-2"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1">
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <Link to="/" className="links nav-link active text-center">
                    Home
                  </Link>
                </li>
              </ul>
              <form
                className="d-flex justify-content-center align-items-center"
                role="form"
              >
                {isloggedIn ? (
                  <>
                    <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="dropdown-container-user"
                    >
                      <img src={user} alt="user" className="user-icon" />
                      {open && <UserDropdown />}
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="links">
                      <button
                        className="btn btn-nav btn-outline-success rounded-pill px-4 py-1"
                        type="button"
                        data-bs-dismiss="offcanvas"
                      >
                        Game Login
                      </button>
                    </Link>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export { Navigation };
