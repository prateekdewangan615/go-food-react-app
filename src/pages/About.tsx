import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <section
        className="about-us"
        style={{ backgroundColor: "#FFF5EE", padding: "50px 0" }}
      >
        <div className="container">
          <header style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1
              style={{ fontSize: "2.5rem", color: "#FF6F00", fontWeight: 700 }}
            >
              Welcome to <span style={{ color: "#FF3D00" }}>GO FOOD</span>
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#333" }}>
              Your go-to food cart app for fresh, delicious, and fast meals.
            </p>
          </header>

          <div className="about-content">
            <div className="vision-mission-values">
              <div
                className="vision"
                style={{
                  backgroundColor: "#FF6F00",
                  color: "white",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "0", // Blunt corners
                }}
              >
                <h2>Our Vision</h2>
                <p>
                  At GO FOOD, we envision becoming the most reliable and
                  accessible food cart app, offering a diverse range of
                  high-quality meals to suit every taste. Our goal is to bring
                  delicious food to your doorstep, whenever you need it.
                </p>
              </div>

              <div
                className="mission"
                style={{
                  backgroundColor: "#FF3D00",
                  color: "white",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "0", // Blunt corners
                }}
              >
                <h2>Our Mission</h2>
                <p>
                  Our mission is to provide affordable, nutritious, and fast
                  meals from the best local food carts. We want to revolutionize
                  the way people experience food on the go, combining
                  convenience with incredible taste.
                </p>
              </div>

              <div
                className="values"
                style={{
                  backgroundColor: "#FF9800",
                  color: "white",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "0", // Blunt corners
                }}
              >
                <h2>Our Values</h2>
                <ul>
                  <li>Quality Ingredients</li>
                  <li>Customer Satisfaction</li>
                  <li>Fast & Reliable Service</li>
                  <li>Commitment to Sustainability</li>
                  <li>Innovation in Food Offerings</li>
                </ul>
              </div>
            </div>

            <div className="image-gallery" style={{ marginTop: "40px" }}>
              <h2 style={{ textAlign: "center", color: "#FF6F00" }}>
                Explore Our Delicious Food
              </h2>
              <div
                className="gallery-container"
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  className="image"
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundImage: 'url("/images/food1.jpg")',
                    backgroundSize: "cover",
                    borderRadius: "10px",
                  }}
                ></div>
                <div
                  className="image"
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundImage: 'url("/images/food2.jpg")',
                    backgroundSize: "cover",
                    borderRadius: "10px",
                  }}
                ></div>
                <div
                  className="image"
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundImage: 'url("/images/food3.jpg")',
                    backgroundSize: "cover",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
            </div>

            <div
              className="team-section"
              style={{ marginTop: "60px", textAlign: "center" }}
            >
              <h2 style={{ color: "#FF6F00" }}>Meet Our Team</h2>
              <p style={{ fontSize: "1.1rem", color: "#333" }}>
                Our team is dedicated to delivering exceptional food and
                services to our customers. From the chefs to the delivery team,
                we work together to ensure your meal experience is flawless.
              </p>
              <div
                className="team-gallery"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px",
                  marginTop: "20px",
                }}
              >
                <div
                  className="team-member"
                  style={{ width: "200px", textAlign: "center" }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/realistic-cook-illustration_23-2149654406.jpg?ga=GA1.1.1746728091.1730782965&semt=ais_hybrid"
                    alt="Team Member 1"
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                  <h3 style={{ color: "#FF3D00" }}>John Doe</h3>
                  <p style={{ fontStyle: "italic", color: "#FF6F00" }}>
                    Chef Extraordinaire
                  </p>
                </div>

                <div
                  className="team-member"
                  style={{ width: "200px", textAlign: "center" }}
                >
                  <img
                    src="https://img.freepik.com/free-photo/fun-3d-cartoon-illustration-indian-businessman_183364-114528.jpg?ga=GA1.1.1746728091.1730782965&semt=ais_hybrid"
                    alt="Team Member 2"
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                  <h3 style={{ color: "#FF3D00" }}>Jane Smith</h3>
                  <p style={{ fontStyle: "italic", color: "#FF6F00" }}>
                    Operations Lead
                  </p>
                </div>

                <div
                  className="team-member"
                  style={{ width: "200px", textAlign: "center" }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/delivery-man-background-design_1212-470.jpg?ga=GA1.1.1746728091.1730782965&semt=ais_hybrid"
                    alt="Team Member 3"
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                  <h3 style={{ color: "#FF3D00" }}>Michael Brown</h3>
                  <p style={{ fontStyle: "italic", color: "#FF6F00" }}>
                    Delivery Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
