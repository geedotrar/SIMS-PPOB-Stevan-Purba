import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ImageSlide = ({ bannerItem }) => {
  return (
    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
      <img src={bannerItem.banner_image} alt="Banner" className="object-cover object-center w-full" />
    </div>
  );
};

export default function ImageSlider({ banner }) {
  if (!banner || !banner.length) {
    return null;
  }

  return (
    <CarouselProvider naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={banner.length} visibleSlides={4} step={1} infinite={true}>
      <div className="w-full relative flex items-center justify-center">
        <ButtonBack role="button" aria-label="Previous Slide" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"></ButtonBack>
        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          <Slider>
            <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
              {banner.map((bannerItem, index) => (
                <Slide key={index} index={index}>
                  <ImageSlide bannerItem={bannerItem} />
                </Slide>
              ))}
            </div>
          </Slider>
        </div>
        <ButtonNext role="button" aria-label="Next Slide" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"></ButtonNext>
      </div>
    </CarouselProvider>
  );
}
