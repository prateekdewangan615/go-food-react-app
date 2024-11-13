import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { IProducts } from "../../models/IProducts";
import "./CartDetails.css";
import { useNavigate } from 'react-router-dom'

const CartDetails = () => {
  const navigate = useNavigate();
  const { myCart, removeCart } = useContext<any>(CartContext);
  console.log("Inside Cart",myCart);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0); // Added state for delivery fee

  useEffect(() => {
    const subtotal = myCart.reduce((acc: number, curr: IProducts) => acc + curr.price * curr.quantity, 0); 
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
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Category</p>
        </div>
        <br />
        <hr />
        {myCart.map((product: IProducts) => {
          
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <p>{product.name}</p>
                  <p>₹{product.price}</p>
                  <p>{product.quantity}</p>
                  <p>{product.category}</p>
                </div>
                <hr />
              </div>
            );
          
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{total}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalAmount()}</b>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/order')} >Proceed To Checkout</button>
      </div>
    </div>
  );
};

export default CartDetails;
