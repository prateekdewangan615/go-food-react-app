import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom"; // Import Link component for routing
import { Helmet } from "react-helmet-async";
import { IProducts } from "../models/IProducts";
import { Link } from "react-router-dom";
// Product List Component
const Products = () => {
  
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/GoFood/api/foodcards"
        );
        console.log(response);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="cover-img">
      <Helmet>
        <title>List of Products</title>
      </Helmet>
      <div>
              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner" id="carousel">
                
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
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next bg-transparent"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
      <div className="container-fluid mt-3 vw-90">
        <h2 className="mb-4 ms-2 text-light">List of Products</h2>
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row">
          {/* Loop through the products array and display each product */}
          {(products.length > 0 )? (
            products.map((product: IProducts) => (
              <div className="col-md-4" key={product.id}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <b>Price: </b>Rs.{product.price} <br />
                    <b>Quantity: </b>
                    {product.quantity}
                    <br />
                    <b>Description: </b>
                    {product.description}
                    <br />
                    <b>Category: </b>
                    {product.category} <br />
                    <Link to={`/products/${product.id}`} className="btn btn-primary mt-3" data-mdb-ripple-init>View Details</Link>
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
