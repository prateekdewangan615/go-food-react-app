import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
const MenuList = ({}) => {
  const { myCart } = useContext<any>(CartContext);
  return (
    <ul className="navbar-nav justify-content-end mb-2 ms-auto gap-2 mb-md-0 ">
      <li className="nav-item">
        <NavLink
          className="nav-link"
          aria-current="page"
          to="/"
          style={({ isActive }) => isActive ? { fontWeight: 'bold' } : {}}
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/products"
          style={({ isActive }) => isActive ? { fontWeight: 'bold' } : {}}
        >
          Products
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/cart"
          style={({ isActive }) => isActive ? { fontWeight: 'bold' } : {}}
        >
          Cart 
          <span className="cart-count">({myCart.length})</span>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/about"
          style={({ isActive }) => isActive ? { fontWeight: 'bold' } : {}}
        >
          About Us
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/contact"
          style={({ isActive }) => isActive ? { fontWeight: 'bold' } : {}}
        >
          Contact Us
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/login"
          style={({ isActive }) => isActive ? { fontWeight: 'bold' } : {}}
        >
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/signup"
          style={({ isActive }) => isActive ? { fontWeight: 'bold' } : {}}
        >
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuList;
