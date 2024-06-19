import Carousel from "./Carousel";

const images = [
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/image1-sec4.png",
    alt: "Imagem 1",
  },
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/image2-sec4.png",
    alt: "Imagem 2",
  },
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/image3-sec4.png",
    alt: "Imagem 3",
  },
];

const Sec4Beautiful = () => {
  return (
    <main className="container mx-auto bg-FCF8F3 mt-16">
      <div className="text-center md:text-start md:flex items-center">
        <div className="flex-1 ml-12 lg:ml-24 md:max-w-md">
          {" "}
          <h2 className="font-poppins font-bold text-Gray1 text-4.5xl pt-10 md:pt-0">
            50 + Beautiful rooms <br /> inspiration
          </h2>
          <p className="font-poppins font-medium text-Gray2 text-base pt-2 pb-10">
            Our designers have created numerous beautiful <br /> prototypes of
            rooms that inspire you
          </p>
          <a
            href="/"
            className="bg-Primary font-poppins font-semibold text-white py-3 px-9 inline-block hover:bg-Primary2 duration-300"
          >
            Explore More
          </a>
        </div>
        <div className="flex-1 px-9 lg:px-0">
          <Carousel images={images} />
        </div>
      </div>
    </main>
  );
};

export default Sec4Beautiful;
