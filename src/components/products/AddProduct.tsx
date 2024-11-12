import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false); // New state for error toast

  const navigate = useNavigate();

  // React Hook Form initialization with validation mode set to 'onChange'
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange", // Trigger validation as the user types
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/GoFood/api/foodcards",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setIsSaved(true);
        setIsError(false);
        setShowToast(true); // Show success toast
        setTimeout(() => {
          setShowToast(false);
          navigate("/products"); // Redirect after the toast disappears
        }, 2000); // Hide toast and navigate after 3 seconds
      } else {
        setIsError(true);
        setShowToast(false); // Hide toast in case of error
        setShowErrorToast(true); // Show error toast
        setTimeout(() => setShowErrorToast(false), 3000); // Hide error toast after 3 seconds
      }
    } catch (error) {
      setIsError(true);
      setShowToast(false); // Hide success toast in case of error
      console.error(error);
      setShowErrorToast(true); // Show error toast on failure
      setTimeout(() => setShowErrorToast(false), 3000); // Hide error toast after 3 seconds
    }
  };

  const handleGoBack = () => {
    navigate("/"); // Adjust the route as per your application
  };

  // Check if all fields are filled before enabling submit button
  const isFormValid =
    watch("name") &&
    watch("description") &&
    watch("price") &&
    watch("quantity") &&
    watch("category");

  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <div className="container mt-5">
        <button className="btn btn-dark mb-4" onClick={handleGoBack}>
          Go Back
        </button>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg p-4">
              <h2 className="text-center mb-4">Add Product</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Product Name */}
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">
                    Product Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Product Name"
                    {...register("name", {
                      required: "Product Name is required",
                    })}
                  />
                  {/* Error Message */}
                  {errors.name && (
                    <div className="invalid-feedback">
                      {(errors.name as any).message}
                    </div>
                  )}
                </div>

                {/* Product Description */}
                <div className="form-group mb-3">
                  <label htmlFor="description" className="form-label">
                    Product Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Product Description"
                    {...register("description", {
                      required: "Product Description is required",
                    })}
                  />
                  {/* Error Message */}
                  {errors.description && (
                    <div className="invalid-feedback">
                      {(errors.description as any).message}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="form-group mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Price"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0,
                        message: "Price must be a positive number",
                      },
                    })}
                    min="0"
                    step="0.01"
                  />
                  {/* Error Message */}
                  {errors.price && (
                    <div className="invalid-feedback">
                      {(errors.price as any).message}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="form-group mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    className={`form-control ${
                      errors.quantity ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Quantity"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Quantity must be at least 1" },
                    })}
                    min="1"
                  />
                  {/* Error Message */}
                  {errors.quantity && (
                    <div className="invalid-feedback">
                      {(errors.quantity as any).message}
                    </div>
                  )}
                </div>

                {/* Category Selection */}
                <div className="form-group mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    className={`form-control ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Select Category</option>
                    <option value="Half">Half</option>
                    <option value="Full">Full</option>
                  </select>
                  {/* Error Message */}
                  {errors.category && (
                    <div className="invalid-feedback">
                      {(errors.category as any).message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="form-group mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!isFormValid}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

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
                Product added successfully!
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
                Failed to add product. Please try again.
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
    </>
  );
};

export default AddProduct;
