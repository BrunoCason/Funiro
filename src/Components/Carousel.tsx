import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide, SplideProps } from "@splidejs/react-splide";
import { useEffect } from "react";

interface Image {
  src: string;
  alt: string;
  text1: string;
  text2: string;
  text3: string;
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
    autoplay: false,
    interval: 3000,
    breakpoints: {
      640: {
        perPage: 1,
        arrows: true,
      },
      1024: {
        perPage: 2,
      },
    },
  };

  useEffect(() => {
    const nextArrow = document.querySelector(".splide__arrow--next") as HTMLElement;

    if (nextArrow) {
      nextArrow.style.width = "40px";
      nextArrow.style.height = "40px";
      nextArrow.classList.add("bg-white");
    }
  }, []);

  useEffect(() => {
    const leftArrow = document.querySelector(".splide__arrow--prev");
    if (leftArrow) {
      leftArrow.remove();
    }
  }, []);

  

  return (
    <Splide options={options}>
      {images.map((image, index) => (
        <SplideSlide key={index}>
          <div className="relative">
            <img src={image.src} alt={image.alt} className="pt-11 pb-11" />
            <div className="absolute bottom-20 left-10 flex items-center">
              <div className="flex flex-col justify-center pl-8 bg-white bg-opacity-70 w-56 h-32">
                <div className="flex">
                  <p className="font-poppins font-medium text-base text-Gray2">
                    {image.text1}
                  </p>
                  <img
                    src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/traco.png"
                    alt=""
                    className="h-1 w-6 border-b border-Gray2 pt-3 mx-2"
                  />
                  <p className="font-poppins font-medium text-base text-Gray2">
                    {image.text2}
                  </p>
                </div>
                <p className="font-poppins font-semibold text-3xl text-Gray1">
                  {image.text3}
                </p>
              </div>
              <img
                src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/arrow-carrousel.png"
                alt="icon arrow"
                className="mt-20"
              />
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Carousel;
