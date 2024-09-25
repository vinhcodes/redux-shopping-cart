import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'; 

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const mainSliderRef = useRef<Slider>(null); // Ref for the main slider

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0); // Track the selected thumbnail index

  const mainSliderSettings = {
    arrows: true,
    fade: true, // Optional fade effect
    adaptiveHeight: true, // Adjust height based on image
  };

  // Function to handle thumbnail click and update the main slider
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index); // Update the selected thumbnail index
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index); // Navigate the main slider to the selected image
    }
  };

  return (
    <div className="carousel-container">
      {/* Main Slider */}
      <Slider {...mainSliderSettings} ref={mainSliderRef} className="main-slider">
        {images.map((img, index) => (
          <div key={index} className="main-slide">
            <img src={img} alt={`Main Slide ${index}`} className="main-slide-img" />
          </div>
        ))}
      </Slider>

      {/* Thumbnails - List/Grid Layout */}
      <div className="thumbnail-list">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail-slide ${index === selectedImageIndex ? 'active' : ''}`} // Highlight active thumbnail
            onClick={() => handleThumbnailClick(index)} // Update the main slider when a thumbnail is clicked
          >
            <img src={img} alt={`Thumbnail ${index}`} className="thumbnail-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
