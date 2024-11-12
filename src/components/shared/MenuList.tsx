import { NavLink } from "react-router-dom";


const MenuList = () => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
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
    </ul>
  );
};

export default MenuList;
