type Icons = {
  src: string;
  alt: string;
  text1: string;
  text2: string;
};

const listItems: Icons[] = [
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-trophy.png",
    alt: "icon trophy",
    text1: "High Quality",
    text2: "crafted from top materials",
  },
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-guarantee.png",
    alt: "icon guarantee",
    text1: "Warranty Protection",
    text2: "Over 2 years",
  },
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-shipping.png",
    alt: "icon shipping",
    text1: "Free Shipping",
    text2: "Order over 150 $",
  },
  {
    src: "https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-support.png",
    alt: "icon support",
    text1: "24 / 7 Support",
    text2: "Dedicated support",
  },
];

const ServiceIcons = () => {
  return (
    <main className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-FAF3EA mt-10">
      {listItems.map((item, index) => (
        <div key={index} className="mx-auto p-5 md:mx-0 flex md:pl-7 md:pt-12 md:pb-12 lg:mx-auto lg:pt-24 lg:pb-24 lg:pl-10">
          <div className="mr-4">
            <img src={item.src} alt={item.alt} />
          </div>
          <div>
            <p className="font-poppins font-semibold text-242424 text-2xl">
              {item.text1}
            </p>
            <p className="font-poppins font-medium text-Gray3 text-xl">
              {item.text2}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default ServiceIcons;
