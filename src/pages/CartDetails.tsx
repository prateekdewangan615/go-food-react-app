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
    setDeliveryFee(subtotal > 0 ? 5 : 0);
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
    <section
      className="about-us"
      style={{ backgroundColor: "#FFF3E0", padding: "50px 0" }}
    >
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
          <div className="d-flex justify-content-center">
            <div
              className="card justify-content-end"
              style={{ width: "18rem", justifyContent: "center" }}
            >
              <div
                className="card "
                style={{
                  background:
                    "linear-gradient(to bottom right, #ff9966, #ffcc99)",
                }}
              >
                <div className="card-body">
                  <table className="table ">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td className="text-end">₹{total}</td>{" "}
                      </tr>
                      <tr>
                        <td>Delivery Fee</td>
                        <td className="text-end">₹{deliveryFee}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Total</b>
                        </td>
                        <td className="text-end">
                          <b>₹{getTotalAmount()}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-grid gap-2">
                    <button
                      onClick={handleCheckout}
                      className="btn btn-primary"
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
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
    </section>
  );
};

export default CartDetails;
