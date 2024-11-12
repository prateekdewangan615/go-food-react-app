import { useContext, useEffect, useState } from "react";
import { IProducts } from "../models/IProducts";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { myCart} = useContext<any>(CartContext);
  console.log(myCart);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(myCart.reduce((acc: number, curr: number) => acc + curr, 0));
  }, [myCart]);
  return (
    <>
      <h1 className="cart-heading">
        Cart products
        <span>({myCart.length})</span>
      </h1>
      <div className="cart-container">
        {myCart.map((product: IProducts) => {
          <div className="card-product" key={product.id}>
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
          </div>;
        })}
      </div>
      <h2 className="cart-amt">Total Amount Rs:{total}</h2>
    </>
  );
};

export default Cart;
