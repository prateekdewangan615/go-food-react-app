import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>(); // Get the 'id' parameter from the URL
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const navigate = useNavigate();

  // Fetch the product data for the given id when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/GoFood/api/foodcards/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setIsError(true);
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false)); // Hide error toast after 3 seconds
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // React Hook Form initialization with validation mode set to 'onChange'
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  // Pre-fill the form fields when the product data is fetched
  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("quantity", product.quantity);
      setValue("category", product.category);
    }
  }, [product, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData: any) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/GoFood/api/foodcards/${id}`, // PUT request to update the product
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setShowToast(true); // Show success toast
        setTimeout(() => {
          setShowToast(false);
          navigate("/products"); // Redirect after toast disappears
        }, 3000); // Hide toast and navigate after 3 seconds
      } else {
        setIsError(true);
        setShowToast(false);
        setShowErrorToast(true); // Show error toast
        setTimeout(() => setShowErrorToast(false), 3000); // Hide error toast after 3 seconds
      }
    } catch (error) {
      setIsError(true);
      setShowToast(false);
      setShowErrorToast(true); // Show error toast on failure
      setTimeout(() => setShowErrorToast(false), 3000); // Hide error toast after 3 seconds
    }
  };

  const handleGoBack = () => {
    navigate("/products"); // Navigate back to the product list
  };

  // Check if all fields are filled before enabling the submit button
  const isFormValid =
    watch("name") &&
    watch("description") &&
    watch("price") &&
    watch("quantity") &&
    watch("category");

  if (isLoading) return <p>Loading product details...</p>;

  return (
    <div className="cover-img">
      <Helmet>
        <title>Update Product</title>
      </Helmet>
      <div className="container">
        <Link to="/products" className="btn btn-primary mt-3 mb-4" onClick={handleGoBack}>
          List of Products
        </Link>

        {isError && (
          <p className="text-danger">
            Failed to load product details. Please try again.
          </p>
        )}

        {product && (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-lg p-4 mb-3">
                <h2 className="text-center mb-4">Update Product</h2>
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
                          value: 50,
                          message: "Price must be a positive number and more than 50",
                        },
                      })}
                      min="0"
                      step="0.01"
                    />
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
                        min: {
                          value: 1,
                          message: "Quantity must be at least 1",
                        },
                        max: {
                          value: 10,
                          message: "Quantity must be less than or equal to 10",
                        },
                      })}
                      min="1"
                    />
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
                      Update Product
                    </button>
                  </div>
                </form>
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
                Product updated successfully!
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
                Failed to update product. Please try again.
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

export default UpdateProduct;
