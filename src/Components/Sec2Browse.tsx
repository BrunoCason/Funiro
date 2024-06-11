import React from 'react';

type Images = {
  src: string;
  alt: string;
  text: string;
};

const listItems: Images[] = [
  { src: '/src/assets/image1-sec2.png', alt: 'Dining', text: 'Dining' },
  { src: '/src/assets/image2-sec2.png', alt: 'Living', text: 'Living' },
  { src: '/src/assets/image3-sec2.png', alt: 'Bedroom', text: 'Bedroom' },
];

const Sec2Browse: React.FC = () => {
  return (
    <div className='container mx-auto'>
      <div className="text-center pt-14">
        <h2 className="font-poppins font-bold text-FontColor text-3xl">
          Browse The Range
        </h2>
        <p className="font-poppins font-normal text-FontColor1 text-base pb-14 lg:text-xl lg:pb-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
        {listItems.map((item, index) => (
          <div key={index}>
            <img src={item.src} alt={item.alt} className="mx-auto pr-5 pl-5"/>
            <p className='text-center font-poppins font-semibold text-base lg:text-2xl text-FontColor pt-2 pb-2 lg:pt-7'>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sec2Browse;
