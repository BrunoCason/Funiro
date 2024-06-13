import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import SingleProduct from "./Pages/SingleProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          {/* <Route path="/about" element={} /> */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
