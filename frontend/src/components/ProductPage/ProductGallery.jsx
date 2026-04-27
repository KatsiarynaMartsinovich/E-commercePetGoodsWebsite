import { useState, useRef, useEffect } from "react";
import nextIcon from "../../assets/next_img.svg";

const ProductGallery = ({ image }) => {
  const realSlides = [image, image, image];

  const slides = [
    realSlides[realSlides.length - 1],
    ...realSlides,
    realSlides[0],
  ];

  const [current, setCurrent] = useState(1);
  const [isTransition, setIsTransition] = useState(true);
  const trackRef = useRef(null);

  const nextSlide = () => {
    if (!isTransition) return;
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransition) return;
    setCurrent((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (current === 0) {
      setIsTransition(false);
      setCurrent(realSlides.length);
    }

    if (current === slides.length - 1) {
      setIsTransition(false);
      setCurrent(1);
    }
  };

  useEffect(() => {
    if (!isTransition) {
      const timeout = setTimeout(() => {
        setIsTransition(true);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [isTransition]);

  return (
    <div className="product-gallery">
      <button className="gallery-arrow prev" onClick={prevSlide}>
        <img src={nextIcon} alt="prev" />
      </button>

      <div className="slider-window">
        <div
          ref={trackRef}
          className="slider-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: isTransition ? "transform 0.4s ease" : "none",
          }}
        >
          {slides.map((img, index) => (
            <div className="slide" key={index}>
              <div className="image-wrapper">
                <img src={img} alt={`slide-${index}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="gallery-arrow next" onClick={nextSlide}>
        <img src={nextIcon} alt="next" />
      </button>

      <div className="dots">
        {realSlides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current - 1 ? "active" : ""}`}
            onClick={() => {
              setIsTransition(true);
              setCurrent(i + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;