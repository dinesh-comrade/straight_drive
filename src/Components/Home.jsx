import React from "react";
import "../CSS/Home.css";
import automated1 from "../assets/Carousel/automated1.png";
import automated2 from "../assets/Carousel/automated2.png";
import automated3 from "../assets/Carousel/automated3.png";
import automated4 from "../assets/Carousel/automated4.png";

const Home = () => {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval={3000}>
          <img
            src={automated1}
            className="d-block w-100 slider-img "
            alt="automated1"
          />
        </div>
        <div className="carousel-item" data-bs-interval={3000}>
          <img
            src={automated2}
            className="d-block w-100 slider-img "
            alt="automated2"
          />
        </div>
        <div className="carousel-item" data-bs-interval={3000}>
          <img
            src={automated3}
            className="d-block w-100 slider-img "
            alt="automated3"
          />
        </div>
        <div className="carousel-item" data-bs-interval={3000}>
          <img
            src={automated4}
            className="d-block w-100 slider-img "
            alt="automated4"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Home;
