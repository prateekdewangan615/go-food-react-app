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
    <section className="contact" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={onSubmit} style={{ maxWidth: '500px', width: '100%' }}>
        <h2>Contact Form</h2>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            placeholder="Enter Your Email"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Full Name
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter Your Name"
            name="name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Enter Your Message
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            name="message"
            placeholder="Enter Your Message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Message Sent" : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
