/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "../CSS/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <header className="home">
      <div className="container">
        <div className="home-content">
          <h1 className="h1-home">Straight Drive Sports & Leisure Pvt Ltd</h1>
          <p className="p-home">
            Straight Drive Cricket Simulators are most popular cricket
            simulators in market with hundreds of installations across the
            world. Straight Drive is believed by bigger brands in the market and
            is a rapidly updating its features time to time. If you have an
            entertainment facility you should have a cricket simulator from
            Straight Drive.
          </p>
          <div className="d-flex justify-content-center">
            <a
              href="https://straightdrive.in/"
              target="_blank"
              className="btn btn-visitors rounded-pill px-4 py-1"
            >
              Visitors
            </a>
            <Link
              to="/straight_drive/login"
              className="btn btn-login rounded-pill px-4 py-1 ms-3"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
