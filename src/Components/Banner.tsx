import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Banner = () => {
  // usa a localização atual da pagina
  const location = useLocation();

  // obtem o nome da pagina com base na rota
  const getPageName = (path: string): string => {
    switch (path) {
      case "/":
        return "Home";
      case "/about":
        return "About";
      case "/contact":
        return "Contact";
      case "/shop":
        return "Shop";
      case "/checkout":
        return "Checkout";
      case "/cart":
        return "Cart";
      default:
        return "Error";
    }
  };

  // atualiza o nome da pagina
  useEffect(() => {
    document.title = getPageName(location.pathname);
  }, [location.pathname]);

  return (
    <main className="container mx-auto bg-banner bg-cover bg-no-repeat">
      <p className="font-poppins font-medium text-5xl text-center pt-32">{getPageName(location.pathname)}</p>
      <div className="flex justify-center p-2">
        <p className="font-poppins text-base font-medium pb-24">
          <a href="/">Home</a>
        </p>
        <p className="font-poppins text-base font-medium pr-3 pl-3">&gt;</p>
        <p className="font-poppins text-base font-light">{getPageName(location.pathname)}</p>
      </div>
    </main>
  );
};

export default Banner;
