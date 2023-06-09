import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        textAlign: "center",
        borderTop: "1px gray solid",
      }}
    >
      <Typography variant="caption">
        {new Date().getFullYear()}&copy; Copyright, LinerPro
      </Typography>
    </div>
  );
};

export default Footer;
