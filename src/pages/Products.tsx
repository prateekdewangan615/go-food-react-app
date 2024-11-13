import { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { Link } from "react-router-dom"; // Import Link component for routing
import { Helmet } from "react-helmet-async";
import { IProducts } from "../models/IProducts";
import "./Products.css";
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
    <>
      <Helmet>
        <title>List of Products</title>
      </Helmet>
      <div className="container mt-5">
        <h2 className="text-center mb-4">List of Products</h2>
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row">
          {/* Loop through the products array and display each product */}
          {(products.length > 0 )? (
            products.map((product: IProducts) => (
              <div className="col-md-3" key={product.id}>
                <div className="card">
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
                    <Link to="/products/{{ card.id }}" className="btn btn-primary mt-3" data-mdb-ripple-init>View Details</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
