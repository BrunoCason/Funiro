import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    document.title = 'Error 404'
  })
  
  return (
    <main className="flex items-center justify-center bg-gray-100 pt-56 pb-80">
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="bg-white mx-4 md:mx-0 sm:p-10 shadow-lg rounded-md py-10">
          <div className="relative flex justify-center items-end">
            <p className="font-montserrat text-9xl text-Primary pb-5">Error</p>
            <p className="absolute font-montserrat text-7xl">404</p>
          </div>
          <div className="text-center">
            <p className="font-montserrat text-lg pt-4 pb-10">
              The page you were looking for was either removed or doesn't exist.
            </p>
            <a
              href="/"
              className="bg-Primary font-poppins font-semibold text-white py-3 px-9"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Error;
