import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import './HomeContent.css'


const HomeContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      
      <div className="header">
        <div className="header-contents">
          <h2>Order your favourite food</h2>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                onClick={() => {
                  navigate("/products");
                }}
              >
                List of Products
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                onClick={() => {
                  navigate("/products/add");
                }}
              >
                Add Product
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
