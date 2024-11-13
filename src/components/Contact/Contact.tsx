import { useState } from "react";

const Contact = () => {
  // State to track the submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define onSubmit function outside the JSX return
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission (default behavior)

    // Disable the submit button immediately when the form is submitted
    setIsSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement); // Get form data
    formData.append("access_key", "44f43c90-6302-437c-a217-00557f03cbf6"); // Append access key

    const object = Object.fromEntries(formData); // Convert form data to object
    const json = JSON.stringify(object); // Convert object to JSON string

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
        console.log("Success", res); // Handle success response
        // Optionally reset the form or show a success message
      }
    } catch (error) {
      console.error("Error submitting form", error); // Handle error
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
        backgroundColor: "#FFF3E0", // Light orange background for a warm feel
        fontFamily: "'Roboto', sans-serif", // Clean and modern font
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#FFFFFF", // White background for the form
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: 600, color: "#FF6F00" }}>
          Contact Form
        </h2>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ fontWeight: "500", color: "#333" }}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            placeholder="Enter Your Email"
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #FF6F00", // Orange border for focus
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF3D00"}
            onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF6F00"}
          />
          <div id="emailHelp" className="form-text" style={{ fontSize: "14px", color: "#777" }}>
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label" style={{ fontWeight: "500", color: "#333" }}>
            Full Name
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter Your Name"
            name="name"
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #FF6F00", // Orange border for focus
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF3D00"}
            onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = "#FF6F00"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{ fontWeight: "500", color: "#333" }}>
            Enter Your Message
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            name="message"
            placeholder="Enter Your Message"
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #FF6F00", // Orange border for focus
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = "#FF3D00"}
            onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = "#FF6F00"}
          ></textarea>
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
            backgroundColor: "#FF6F00", // Primary orange color
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