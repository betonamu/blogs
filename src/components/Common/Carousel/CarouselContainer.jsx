import { useRef } from "react";

import Carousel from ".";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const CarouselContainer = ({ slides, slideToShow, renderSlide }) => {
  const ref = useRef(null);

  return (
    <Carousel
      slideToShow={slideToShow}
      onInit={(carousel) => {
        console.log({ carousel });
        ref.current = carousel;
      }}
    >
      <Carousel.Button onClick={() => ref.current.scrollPrev()}>
        <ChevronLeftIcon />
      </Carousel.Button>
      <Carousel.ViewPort>
        <Carousel.Container>
          {slides.map((slide, index) => (
            <Carousel.Slide key={slide.id || index}>
              {renderSlide(slide, index)}
            </Carousel.Slide>
          ))}
        </Carousel.Container>
      </Carousel.ViewPort>
      <Carousel.Button
        onClick={() => ref.current.scrollNext()}
        direction="next"
      >
        <ChevronRightIcon />
      </Carousel.Button>
    </Carousel>
  );
};

export default CarouselContainer;
