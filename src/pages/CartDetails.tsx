import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { IProducts } from "../models/IProducts";
import "./CartDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const CartDetails = () => {
  const navigate = useNavigate();
  const { myCart } = useContext<any>(CartContext);
  console.log("Inside Cart", myCart);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [showToast, setShowToast] = useState(false); // State for toast visibility

  useEffect(() => {
    const subtotal = myCart.reduce(
      (acc: number, curr: IProducts) => acc + curr.price * curr.quantity,
      0
    );
    setTotal(subtotal);
    setDeliveryFee(subtotal > 0 ? 2 : 0);
  }, [myCart]);

  const getTotalAmount = () => {
    return total + deliveryFee;
  };

  const handleCheckout = () => {
    setShowToast(true); // Show toast
    setTimeout(() => {
      setShowToast(false); // Hide toast after 3 seconds
      navigate("/"); // Navigate to home page
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {myCart.length > 0 ? (
        <>
          <h2 className="text-center mb-4">Cart</h2>
          <Table className="container">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Product Name</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {myCart.map((product: IProducts, index: any) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div
            className="card justify-content-end"
            style={{ width: "18rem", justifyContent: "right" }}
          >
            <div className="card-body">
              <div className="card-text">
                <p>Subtotal : ₹{total}</p>
                <p>Delivery Fee : ₹{deliveryFee}</p>
                <p>
                  <b>Total: ₹{getTotalAmount()}</b>
                </p>
              </div>
              <button onClick={handleCheckout}>Proceed To Checkout</button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mb-4 alert alert-danger">
          <h2>No Items in the Cart</h2>
          <Link to="/products" className="btn btn-primary mt-3">
            Order Something Now
          </Link>
        </div>
      )}
      {showToast && (
        <div
          className="toast align-items-center text-bg-success border-0 show"
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            width: "400px",
            zIndex: 999,
          }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div
              className="toast-body"
              style={{ fontSize: "1.2rem", padding: "1.2rem" }}
            >
              Congratulations, Your order has been noted!
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;