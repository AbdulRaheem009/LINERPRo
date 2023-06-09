import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import chatbot from "../img/chatbot.png";
import marksheet from "../img/marksheet.png";
import ranking from "../img/Ranking.png";
import Search from "../img/search_uni.png";
import TrainningSessions from "../img/TrainningSessions.png";
import LiveChat from "../img/LiveChat.png";

export default function Services() {
  return (
    <>
      <Typography variant="h4" style={{display: "flex", justifyContent: "center"}}>Services</Typography>
      <hr style={{ width: "10%" }} />
      <Card
        sx={{ display: "flex", justifyContent: "space-around" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{}}>
            <Typography component="div" variant="h6">
              Get Recomendation By Us
            </Typography>
          </CardContent>
        </Box>
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={chatbot}
            alt=""
          />
        </Box>
      </Card>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
        elevation={0}
      >
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={marksheet}
            alt=""
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{}}>
            <Typography component="div" variant="h6">
              Recomendation Based <br /> on Intermediate Marks
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
        elevation={0}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{}}>
            <Typography component="div" variant="h6">
              Get Top HEC Rankings
            </Typography>
          </CardContent>
        </Box>
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={ranking}
            alt=""
          />
        </Box>
      </Card>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
        elevation={0}
      >
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={Search}
            alt=""
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{}}>
            <Typography component="div" variant="h6">
              Search University From <br /> All Over the Pakkistan
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
        elevation={0}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{}}>
            <Typography component="div" variant="h6">
              Get Trainning Sessions
            </Typography>
          </CardContent>
        </Box>
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={TrainningSessions}
            alt=""
          />
        </Box>
      </Card>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
        elevation={0}
      >
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={LiveChat}
            alt=""
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{}}>
            <Typography component="div" variant="h6">
              Live Chat with the Experts.
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
