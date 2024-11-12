import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

 
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="row">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Welcome to Go Food App
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus corrupti dolore praesentium debitis. Repellendus
              nobis quas quae consectetur iste ad odio! Explicabo sequi qui
              pariatur ipsam a eligendi consectetur quam?
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                onClick={() =>{
                  navigate("/products");
                }}
              >
                List of Products
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                onClick={() =>{
                  navigate("/products/add");
                }}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
