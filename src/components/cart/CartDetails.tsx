import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { IProducts } from "../../models/IProducts";
import "./CartDetails.css";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

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
    <>
    {myCart.length > 0 ? 
    <>
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
          {myCart.map((product: IProducts,index:any) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="card justify-content-end" style={{ width: "18rem", justifyContent: "right" }}>
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
    </>
    : 
    (
      <p style={{textAlign: "center"}}>Your cart is empty !!!</p>
    )}
    </>
  );
};

export default CartDetails;
