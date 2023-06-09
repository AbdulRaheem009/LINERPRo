import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../img/logos.png";
import React from "react";

const About = () => {
  return (
    <div id="About" style={{ marginTop: "100px" }}>
      <Container style={{ textAlign: "center", marginTop: "0px" }}>
        <Typography variant="h4">About Us</Typography>
        <Box style={{ display: "flex" }}>
          <Box>
            <img src={Logo} style={{ height: "150px", marginTop: "50px", marginLeft: "-30px"}} />
          </Box>
          <Box>
            <Typography
              variant="body2"
              style={{
                display: "flex",
                marginTop: "5%",
                textAlign: "justify",
                padding: "20px",
                marginLeft: "100px",
                marginBottom: "20px"
              }}
            >
              Our extension site is dedicated to providing access to high-quality educational opportunities to individuals who may not have the means or ability to attend traditional educational institutions.
              It all started at the time of COVID-19 when each person was at home, our team thought that not every person is getting education properly so we scroll and scroll and came out of this brillient and messmerizing idea. Our Mission is to increase the literacy rate of the World. We ensure the transperancy of every user.
              We believe that education is a transformative experience that should be accessible to all, and we are proud to be a part of that mission. Join us today and discover the many benefits of learning at our extension sites. Our core team include 3 members working hard day and night to make this world educated.
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default About;
