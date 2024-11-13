
import "./App.css";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import AddProduct from "./components/products/AddProduct";
import ProductDetails from "./components/products/ProductDetails";
import UpdateProduct from "./components/products/UpdateProduct";


function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="">
        {/* Routing Configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
