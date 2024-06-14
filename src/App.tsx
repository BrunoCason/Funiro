import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import SingleProduct from "./Pages/SingleProduct";
import Login from "./Components/Login";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          {/* <Route path="/about" element={} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
