import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { IProducts } from "../../models/IProducts";
import "./CartDetails.css";
import { Link, useNavigate } from "react-router-dom";

const CartDetails = () => {
  const navigate = useNavigate();
  const { myCart, removeCart } = useContext<any>(CartContext);
  console.log("Inside Cart", myCart);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0); // Added state for delivery fee

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

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>
            <b>Title</b>
          </p>
          <p>
            <b>Price</b>
          </p>
          <p>
            <b>Quantity</b>
          </p>
          <p>
            <b>Category</b>
          </p>
        </div>
        <br />
        <hr />
        {myCart.length > 0 ? (
          myCart.map((product: IProducts) => {
            return (
              <div key={product.id}>
                <div className="cart-items-title cart-items-item">
                  <p>{product.name}</p>
                  <p>₹{product.price}</p>
                  <p>{product.quantity}</p>
                  <p>{product.category}</p>
                </div>
                <hr />
              </div>
            );
          })
        ) : (
          <div className="text-center mb-4">
            <h2>No Items in the Cart</h2>
            <Link to="/products" className="btn btn-primary mt-3">Order Something Now</Link>
          </div>
        )}
      </div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <p className="card-text">
            <p>Subtotal : ₹{total}</p>
            <p>Delivery Fee : ₹{deliveryFee}</p>
            <p>
              <b>Total: ₹{getTotalAmount()}</b>
            </p>
          </p>
          <button onClick={() => navigate("/order")}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
