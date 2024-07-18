import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import SliderItemProduct from "./SliderItemProduct";

const Slider = ({ data, sliderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 3 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === data.length - 3;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full mx-auto mt-8">
      <div className="flex justify-between items-center">
        <button
          onClick={prevSlide}
          className="text-white bg-indigo-400 hover:bg-indigo-500 shadow-xl px-4 py-2 rounded-full"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="relative w-full h-72 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full flex transition-transform transform"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {data.map((product) => (
              <SliderItemProduct product={product} />
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="text-white bg-indigo-400 hover:bg-indigo-500 shadow-xl px-4 py-2 rounded-full"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
