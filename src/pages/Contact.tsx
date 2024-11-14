import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string; message?: string }>({});
  
  // Validate form inputs
  const validateForm = () => {
    const newErrors: { email?: string; name?: string; message?: string } = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!name) {
      newErrors.name = "Full name is required.";
    }

    if (!message) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // First, validate the form
    if (!validateForm()) {
      return; // Stop submission if there are errors
    }

    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "44f43c90-6302-437c-a217-00557f03cbf6");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        // Optionally reset the form or show a success message
        setEmail("");
        setName("");
        setMessage("");
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="contact"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FFF3E0",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: 600,
            color: "#FF6F00",
          }}
        >
          Contact Form
        </h2>

        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
            style={{ fontWeight: "500", color: "#333" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #FF6F00",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF3D00"}
            onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF6F00"}
          />
          {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
            style={{ fontWeight: "500", color: "#333" }}
          >
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #FF6F00",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF3D00"}
            onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF6F00"}
          />
          {errors.name && <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>}
        </div>

        <div className="mb-3">
          <label
            htmlFor="message"
            className="form-label"
            style={{ fontWeight: "500", color: "#333" }}
          >
            Enter Your Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows={3}
            name="message"
            placeholder="Enter Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #FF6F00",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = "#FF3D00"}
            onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = "#FF6F00"}
          ></textarea>
          {errors.message && <p style={{ color: "red", fontSize: "14px" }}>{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#FF6F00",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#FF3D00"}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#FF6F00"}
        >
          {isSubmitting ? "Message Sent" : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;