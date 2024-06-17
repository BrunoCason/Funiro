import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import SingleProduct from "./Pages/SingleProduct";
import Login from "./Components/Login";
import Checkout from "./Pages/Checkout";
import Error from "./Pages/Error";
import { auth } from "./firebase";
import { User } from "firebase/auth";
import Cart from "./Pages/Cart";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  return (
    <div>
      {!isLoginRoute && <Header />}
      {children}
      {!isLoginRoute && <Footer />}
    </div>
  );
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const PrivateRoute = () => {
    if (loading) return null;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return null;
    return user ? <Navigate to="/" replace /> : <>{children}</>;
  };

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<Error />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
