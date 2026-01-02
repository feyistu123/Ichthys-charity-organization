import React, { useState } from "react";
import { images } from "../assets/Images/images";

import { images as imageAssets } from "../assets/Images/images";

const ImageSlider = () => {
  const sliderImages = [
    imageAssets.images1,
    imageAssets.image2,
    imageAssets.image3,
    imageAssets.image4,
  ];

  const imagesPerView = 2;
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) =>
      prev + imagesPerView >= sliderImages.length ? 0 : prev + imagesPerView
    );
  };

  return (
    <div className="slider-window">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${(current / imagesPerView) * 100}%)`,
        }}
      >
        {sliderImages.map((img, index) => (
          <img key={index} src={img} alt={`slide-${index}`} />
        ))}
      </div>

      <button onClick={nextImage}>Next</button>
    </div>
  );
};

export default ImageSlider;
