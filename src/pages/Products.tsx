import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { IProducts } from "../models/IProducts";
import { CartContext } from "../components/context/CartContext";
import "./Products.css"
// Product List Component
const Products = () => {

  
  const { myCart, setMyCart } = useContext<any>(CartContext);
  console.log(myCart);

  const addCart = (product: IProducts) => {
    setMyCart([...myCart, product]);
    console.log("inside add cart",product);
  };
  const removeCart = (product: IProducts) => {
    setMyCart(myCart.filter((c: { id: number }) => c.id !== product.id));
  };
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
      <div className="product-container mt-5" style={{ }}>
        <h2 className="text-center mb-4 ">List of Products</h2>
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row">
          {/* Loop through the products array and display each product */}
          {products.length > 0 ? (
            products.map((product: IProducts) => (
              <div className="col-md-3" key={product.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <b>Price: </b>₹{product.price} <br />
                    <b>Quantity: </b>
                    {product.quantity}
                    <br />
                    <b>Description: </b>
                    {product.description}
                    <br />
                    <b>Category: </b>
                    {product.category} <br />
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/products/${product.id}`} 
                        className="btn btn-primary mt-3 "
                        data-mdb-ripple-init
                      >
                        View Details
                      </Link>
                      {myCart.find((prod: IProducts) => prod.id === product.id) ? (
                      <Link
                        className="btn btn-danger mt-3"
                        to="#"
                        onClick={() => {
                          console.log("Remove Product from Cart");
                          console.log(product);
                          removeCart(product);
                        }}
                      >
                        Remove cart
                      </Link>
                    ) : (
                      <Link
                        className="btn btn-success mt-3"
                        to="#"
                        onClick={() => {
                          console.log("Add Product to Cart");
                          console.log(product);
                          addCart(product);
                        }}
                      >
                        Add to cart
                      </Link>
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
    </>
  );
};

export default Products;
