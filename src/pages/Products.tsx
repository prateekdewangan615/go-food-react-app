import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link component for routing
import { Helmet } from "react-helmet-async";

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
        console.log(response.data);
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
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-4" key={product.id}>
                <div
                  className="card mb-4 shadow-sm"
                  style={{ height: "400px", width: "400px" }}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/150"} // Fallback image
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">{product.category}</span>
                      <span className="font-weight-bold">
                        ₹{product.price}
                      </span>{" "}
                      {/* Displaying price in INR */}
                    </div>
                    {/* Link to the product details page */}
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-primary mt-3"
                    >
                      View Details
                    </Link>
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
