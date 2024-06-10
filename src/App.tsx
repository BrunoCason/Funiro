import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/shop" element={} />
          <Route path="/about" element={} />
          <Route path="/contact" element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
