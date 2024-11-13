import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the 'id' parameter from the URL
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for showing the confirmation modal
  const [showToast, setShowToast] = useState(false); // State for showing the success toast
  const [showErrorToast, setShowErrorToast] = useState(false); // State for showing the error toast
  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/GoFood/api/foodcards/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Navigate to the edit page for the product
  const handleEdit = () => {
    navigate(`/products/${id}/edit`); // Navigate to the edit page for this product
  };

  // Show the confirmation modal
  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  // Hide the confirmation modal
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  // Delete the product with a toast notification and 3-second delay before navigating
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/GoFood/api/foodcards/${id}`
      );
      if (response.status === 200) {
        // Close the confirmation modal
        setShowConfirmation(false);

        // Show success toast notification
        setShowToast(true);

        // Wait for 3 seconds and then navigate to the products page
        setTimeout(() => {
          setShowToast(false);
          navigate("/products");
        }, 2000); // Hide toast and navigate after 3 seconds
      }
    } catch (err) {
      // Close the confirmation modal
      setShowConfirmation(false);

      // Show error toast notification in case of failure
      setShowErrorToast(true);

      // Hide error toast after 3 seconds
      setTimeout(() => setShowErrorToast(false), 2000);
    }
  };

  const fallbackImages:any = {
    1: "https://wallpapers.com/images/featured/veg-biryani-png-cs2zh8qs339tqm71.jpg",
    2: "https://pngimg.com/d/pizza_PNG44077.png",
    3: "https://th.bing.com/th/id/OIP.8y10z_EgQtbGqIRTOK1xeQAAAA?rs=1&pid=ImgDetMain",
    4: "https://static.vecteezy.com/system/resources/previews/033/025/977/non_2x/butter-chicken-tikka-masala-served-with-roti-ai-generated-png.png",
    5: "https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-chole-bhature-indian-and-pakistani-street-food-png-image_12629540.png",
    6: "https://vismaifood.com/storage/app/uploads/public/609/3dc/1d7/6093dc1d77053892307086.jpg",
    7: "https://noveltysweets.co.nz/wp-content/uploads/2021/08/Pav-Bhaji-min.png",
    8: "https://static.vecteezy.com/system/resources/previews/026/915/126/non_2x/indian-naan-bread-with-garlic-and-butter-pita-bread-on-a-white-background-png.png",
    9: "https://static.vecteezy.com/system/resources/previews/022/149/349/non_2x/samosa-on-a-plate-with-sauce-and-tomatoes-png.png",
    10: "https://th.bing.com/th/id/OIP.SfUGqEdO9-T5Yz5gvWXtcwHaHa?rs=1&pid=ImgDetMain",
    // Add more product IDs and fallback images as needed
    default: "https://via.placeholder.com/150",
  };

  return (
    <div className="cover-img">
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div className="container-fluid mb-3">
        <Link className="btn btn-primary mt-3 mb-4" to="/products/add">
          Add a new Item
        </Link>

        {isLoading && <p>Loading product details...</p>}

        {error && <p className="alert alert-danger">{error}</p>}

        {product && (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-lg p-4 mb-3">
                <h2 className="text-center mb-4">{product.name}</h2>

                {/* Display product details */}
                <div className="row">
                  <div className="col-md-4">
                    {/*"https://via.placeholder.com/150"*/}
                    <img
                      src={
                        product.image ||
                        fallbackImages[product.id] ||
                        fallbackImages.default
                      }
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8 mt-4">
                    <h5>Description</h5>
                    <p>{product.description}</p>

                    <div className="mb-2">
                      <strong>Price:</strong> ₹{product.price}
                    </div>
                    <div className="mb-2">
                      <strong>Quantity:</strong> {product.quantity}
                    </div>
                    <div className="mb-2">
                      <strong>Category:</strong> {product.category}
                    </div>
                  </div>
                </div>

                {/* Edit and Delete buttons */}
                <div className="d-flex justify-content-center mt-4">
                  <button className="btn btn-primary mx-2" onClick={handleEdit}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={handleShowConfirmation}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100vh",
              zIndex: 9999,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
            }}
            role="dialog"
            aria-labelledby="deleteConfirmationModal"
            aria-hidden="false"
          >
            <div
              className="modal-dialog modal-dialog-centered"
              style={{ maxWidth: "500px" }}
            >
              <div className="modal-content rounded-3 shadow-lg">
                <div className="modal-header border-bottom-0">
                  <h5 className="modal-title" id="deleteConfirmationModal">
                    Confirm Deletion
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCancelConfirmation}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-center">
                    Are you sure you want to delete the product{" "}
                    <strong>{product.name}</strong>?
                  </p>
                  <p className="text-center text-muted">
                    This action cannot be undone.
                  </p>
                </div>
                <div className="modal-footer border-top-0 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancelConfirmation}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Toast Notification */}
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
                Product deleted successfully!
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

        {/* Error Toast Notification */}
        {showErrorToast && (
          <div
            className="toast align-items-center text-bg-danger border-0 show"
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
                Failed to delete product. Please try again.
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowErrorToast(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
