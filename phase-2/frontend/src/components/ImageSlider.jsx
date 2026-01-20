import React, { useState } from "react";
import { images } from "../assets/Images/images";

const ImageSlider = () => {
  const sliderImages = [
    images.images1,
    images.image2,
    images.image3,
    images.image4,
    images.image5,
    images.image6,
  ];

  const imagesPerView = 3;
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) =>
      prev + imagesPerView >= sliderImages.length ? 0 : prev + imagesPerView
    );
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? Math.max(0, sliderImages.length - imagesPerView) : prev - imagesPerView
    );
  };

  return (
    <div className="slider-container">
      <button className="slider-btn prev-btn" onClick={prevImage}>
        <i className="bi bi-chevron-left"></i>
      </button>
      
      <div className="slider-window">
        <div className="slider-track">
          {sliderImages.slice(current, current + imagesPerView).map((img, index) => (
            <img key={current + index} src={img} alt={`slide-${current + index}`} className="slider-image" />
          ))}
        </div>
      </div>
      
      <button className="slider-btn next-btn" onClick={nextImage}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default ImageSlider;
