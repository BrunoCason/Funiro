import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide, SplideProps } from "@splidejs/react-splide";
import { useEffect } from "react";

interface Image {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
}

const Carousel = ({ images }: ImageCarouselProps) => {
  const options: SplideProps["options"] = {
    rewind: false,
    type: "loop",
    width: "100%",
    autoWidth: true,
    pagination: false,
    gap: 40,
    arrows: true,
    perPage: 1,
    autoplay: true,
    interval: 3000,
    breakpoints: {
      640: {
        perPage: 1,
        arrows: false,
      },
      1024: {
        perPage: 2,
      },
    },
  };

  useEffect(() => {
    const leftArrow = document.querySelector('.splide__arrow--prev');
    if (leftArrow) {
      leftArrow.remove();
    }
  }, []);

  return (
    <Splide options={options}>
      {images.map((image, index) => (
        <SplideSlide key={index}>
          <img
            src={image.src}
            alt={image.alt}
            className="pt-11 pb-11"
          />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Carousel;
