import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  max-width: 1200px; /* Adjust as needed */
  margin: 0 auto;
  padding: 20px; /* Adjust padding as needed */
`;

const Section = styled.section`
  background-color: #fff5ee;
  padding: 50px 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const VisionMissionValues = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows elements to wrap onto the next line if needed */
  justify-content: space-around; /* Distributes space evenly between elements */
  gap: 20px;
`;

const VisionMissionValuesItem = styled.div`
  background-color: ${({ theme }) =>
    theme.colors.primary}; /* Use theme for color consistency */
  color: white;
  padding: 20px;
  flex: 1; /* Each item takes equal width */
  min-width: 300px; /* Minimum width to prevent collapsing */
  border-radius: 0;
  h2 {
    color: white;
  }
`;

const ImageGallery = styled.div`
  margin-top: 40px;
  h2 {
    text-align: center;
    color: #ff6f00;
  }
`;

const TeamSection = styled.div`
  margin-top: 60px;
  text-align: center;
  h2 {
    color: #ff6f00;
  }
  p {
    font-size: 1.1rem;
    color: #333;
  }
`;

const TeamGallery = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
`;

const TeamMember = styled.div`
  width: 200px;
  text-align: center;
  img {
    width: 100%;
    border-radius: 50%;
  }
  h3 {
    color: #ff3d00;
  }
  p {
    font-style: italic;
    color: #ff6f00;
  }
`;

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <Section>
        <Container>
          <Header>
            <h1>Welcome to Go Food</h1>
            <Paragraph>
              Your go-to food cart app for fresh, delicious, and fast meals.
            </Paragraph>
          </Header>

          <VisionMissionValues>
            <VisionMissionValuesItem theme={{ colors: { primary: "#FF6F00" } }}>
              <h2>Our Vision</h2>
              <Paragraph>
                At GO FOOD, we envision becoming the most reliable and
                accessible food cart app, offering a diverse range of
                high-quality meals to suit every taste. Our goal is to bring
                delicious food to your doorstep, whenever you need it.
              </Paragraph>
            </VisionMissionValuesItem>
            <VisionMissionValuesItem theme={{ colors: { primary: "#FF3D00" } }}>
              <h2>Our Mission</h2>
              <Paragraph>
                Our mission is to provide affordable, nutritious, and fast meals
                from the best local food carts. We want to revolutionize the way
                people experience food on the go, combining convenience with
                incredible taste.
              </Paragraph>
            </VisionMissionValuesItem>
            <VisionMissionValuesItem theme={{ colors: { primary: "#FF9800" } }}>
              <h2>Our Values</h2>
              <ul>
                <li>Quality Ingredients</li>
                <li>Customer Satisfaction</li>
                <li>Fast & Reliable Service</li>
                <li>Commitment to Sustainability</li>
                <li>Innovation in Food Offerings</li>
              </ul>
            </VisionMissionValuesItem>
          </VisionMissionValues>

          <ImageGallery>
            <h2>Explore Our Delicious Food</h2>
            <div
              className="gallery-container"
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div
                className="image"
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundImage:
                    'url("https://pngimg.com/d/pizza_PNG44077.png")',
                  backgroundSize: "cover",
                  borderRadius: "10px",
                }}
              ></div>
              <div
                className="image"
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundImage:
                    'url("https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-chole-bhature-indian-and-pakistani-street-food-png-image_12629540.png")',
                  backgroundSize: "cover",
                  borderRadius: "10px",
                }}
              ></div>
              <div
                className="image"
                style={{
                  width: "310px",
                  height: "310px",
                  backgroundImage:
                    'url("https://noveltysweets.co.nz/wp-content/uploads/2021/08/Pav-Bhaji-min.png")',
                  backgroundSize: "cover",
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          </ImageGallery>

          <TeamSection>
            <h2>Meet Our Team</h2>
            <Paragraph>
              Our team is dedicated to delivering exceptional food and services
              to our customers. From the chefs to the delivery team, we work
              together to ensure your meal experience is flawless.
            </Paragraph>
            <TeamGallery>
              <TeamMember>
                <img
                  src="https://img.freepik.com/free-vector/chef-man-with-chocolate-bowl-cartoon-sticker_1308-63968.jpg?ga=GA1.1.1746728091.1730782965&semt=ais_hybrid"
                  alt="Team Member 1"
                />
                <h3>John Doe</h3>
                <p>Chef Extraordinaire</p>
              </TeamMember>
              <TeamMember>
                <img
                  src="https://img.freepik.com/free-photo/fun-3d-cartoon-illustration-indian-businessman_183364-114528.jpg?ga=GA1.1.1746728091.1730782965&semt=ais_hybrid"
                  alt="Team Member 2"
                />
                <h3>Jane Smith</h3>
                <p>Operations Lead</p>
              </TeamMember>
              <TeamMember>
                <img
                  src="https://img.freepik.com/free-vector/delivery-man-background-design_1212-470.jpg?ga=GA1.1.1746728091.1730782965&semt=ais_hybrid"
                  alt="Team Member 3"
                />
                <h3>Michael Brown</h3>
                <p>Delivery Manager</p>
              </TeamMember>
            </TeamGallery>
          </TeamSection>
        </Container>
      </Section>
    </>
  );
};

export default About;
