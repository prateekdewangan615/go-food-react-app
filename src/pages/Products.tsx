import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { IProducts } from "../models/IProducts";
import { CartContext } from "../components/context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is imported for carousel

import "./Products.css";

const Products = () => {
  const { myCart, setMyCart } = useContext<any>(CartContext);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const addCart = (product: IProducts) => {
    const quantity = quantities[product.id] || 1;
    setMyCart([...myCart, { ...product, quantity }]);
  };

  const removeCart = (product: IProducts) => {
    setMyCart(myCart.filter((c: { id: number }) => c.id !== product.id));
  };

  const handleQtyChange = (productId: number, qty: number) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [productId]: qty }));
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/GoFood/api/foodcards");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="cover-img">
      <Helmet>
        <title>List of Products</title>
      </Helmet>
      {/* Carousel Section */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1899&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D"
              className="d-block w-100"
              alt="2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1575496118038-3689d62e5235?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev bg-transparent"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next bg-transparent"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Products Section */}
      <div className="container-fluid mt-5">
        <h2 className="text-center mb-4 text-light">List of Products</h2>
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {products.length > 0 ? (
            products.map((product: IProducts) => (
              <div className="col-md-3" key={product.id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p><b>Price:</b> ₹{product.price}</p>
                    <select
                      className="m-2 h-100 rounded"
                      onChange={(e) => handleQtyChange(product.id, Number(e.target.value))}
                      style={{ backgroundColor: "#E4A11B", color: "#0F172B" }}
                      value={quantities[product.id] || 1}
                    >
                      {Array.from({ length: 6 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                    <p><b>Quantity:</b> {quantities[product.id] || 1}</p>
                    <p><b>Description:</b> {product.description}</p>
                    <p><b>Category:</b> {product.category}</p>
                    <div className="d-flex justify-content-between">
                      <Link to={`/products/${product.id}`} className="btn btn-primary mt-3">
                        View Details
                      </Link>
                      {myCart.some((prod: IProducts) => prod.id === product.id) ? (
                        <button
                          className="btn btn-danger mt-3 ms-2"
                          onClick={() => removeCart(product)}
                        >
                          Remove  Cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-success mt-3"
                          onClick={() => addCart(product)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Products;
