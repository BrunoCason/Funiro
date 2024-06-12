import { useEffect, useState } from "react";

type NavItem = {
  text: string;
  link: string;
};

const listItems: NavItem[] = [
  { text: "Home", link: "/" },
  { text: "Shop", link: "/shop" },
  { text: "About", link: "/" },
  { text: "Contact", link: "/contact" },
];

const Header = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [navBarActive, setNavBarActive] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = document.documentElement.clientWidth;

      if (width < 768) {
        setHamburgerActive(true);
      } else {
        setHamburgerActive(false);

        if (navBarActive) setNavBarActive(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navBarActive]);

  return (
    <header className="container mx-auto h-24 flex justify-between md:justify-center items-center">
      <div className="flex items-center">
        <a href="/">
          <img src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/logo-header.svg" alt="" />
        </a>
        <p className="font-montserrat font-bold text-3xl ml-2">Furniro</p>
      </div>

      <div className={`w-full bg-FCF8F3 opacity-70 fixed top-0 bottom-0 left-0 z-40 ${navBarActive ? 'visible' : 'invisible'}`} onClick={() => setNavBarActive(false)}></div>

      <nav
        className={`bg-Primary fixed transition-transform text-center z-50 top-0 -right-64 h-full flex flex-col justify-center md:flex-row md:static md:w-auto md:h-auto md:bg-opacity-0 ${
          navBarActive && "-translate-x-64"
        }`}
      >
        <ul className="flex flex-col font-poppins font-medium text-base md:flex-row xl:ml-20 2xl:ml-60">
          {listItems.map((item) => (
            <li className="mt-5 mb-5" key={item.text}>
              <a className="mr-14 ml-14 md:mr-7 md:ml-7 lg:mr-14 lg:ml-14" href={item.link}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex justify-center xl:ml-36 2xl:ml-80">
          <img
            src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-user.svg"
            alt="icon user"
            className="pr-8"
          />
          <img
            src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/icon-carrinho.svg"
            alt="icon carrinho de compra"
          />
        </div>
      </nav>

      <div className="flex items-center">
        {hamburgerActive && (
          <button onClick={() => setNavBarActive(true)}>
            <img src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/menu-icon.svg" alt="menu" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;