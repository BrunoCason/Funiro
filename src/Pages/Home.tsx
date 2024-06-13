import { useEffect } from "react";
import Sec1Discover from "../Components/Sec1Discover";
import Sec2Browse from "../Components/Sec2Browse";
import Sec3Products from "../Components/Sec3Products";
import Sec4Beautiful from "../Components/Sec4Beautiful";
import Sec5Funiro from "../Components/Sec5Funiro";

const Home = () => {
  useEffect(() => {
    document.title = 'Home'
  })

  return (
    <main>
      <Sec1Discover />
      <Sec2Browse />
      <Sec3Products/>
      <Sec4Beautiful/>
      <Sec5Funiro />
    </main>
  );
};

export default Home;
