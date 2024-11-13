import { Link } from "react-router-dom";
import MenuList from "./MenuList";
import logo from "../../assets/images/goFood.png";
function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-light  my-white-navbar">

      <div className="container-fluid">
        <Link to="/">
          <img
            src={logo}
            alt="GoFood Logo"
            className="navbar-logo"
            style={{ maxWidth: "100px" }}
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <MenuList />
        </div>
      </div>
    </nav>
  );
}

export default Header;
