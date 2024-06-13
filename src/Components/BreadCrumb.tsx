import React from 'react';

interface BreadCrumbProps {
  productName: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ productName }) => {
  return (
    <main className="container mx-auto bg-F9F1E7">
      <div className="flex pt-9 pb-9 justify-center lg:justify-start lg:pl-24 mb-8">
        <a className="font-poppins font-normal text-sm sm:text-base text-9F9F9F" href="/">
          Home
        </a>
        <p className="font-poppins text-sm sm:text-base font-bold pr-5 pl-5">&gt;</p>
        <a
          className="font-poppins font-normal text-sm sm:text-base text-9F9F9F"
          href="/shop"
        >
          Shop
        </a>
        <p className="font-poppins text-base font-bold pr-5 pl-5">&gt;</p>
        <p className="font-poppins font-normal text-sm sm:text-base border-l border-9F9F9F pl-5">
          {productName}
        </p>
      </div>
    </main>
  );
};

export default BreadCrumb;
