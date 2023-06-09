import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signmupimage from "../img/signupimage.jpeg";
import Grid from "@mui/material/Grid";
import signmup from "../img/signup.png";
export default function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Name Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(8, "Minimum 8 character Password Required.")
        .required("Password Required"),
    }),
    onSubmit: (values) => {
      const userObj = {
        Name: values.name,
        Email: values.email,
        Password: values.password,
      };
      axios
        .post("http://localhost:5000/api/users", userObj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          navigate("/signIn");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
  });

  return (
    <>
      <ToastContainer />
      <Box className="signupbackground"
        sx={{ width: "100%", borderLeft: "none", display: "flex", flexDirection: "row" }}
      >
        <Box sx={{
          width: "58%",
          display: "flex",
          alignItems: "right",
          display: "flex",
          flexDirection: "row",
        }}>
          <img src={signmupimage}>
          </img>
        </Box>
        <Box className="signupcard" style={{ marginTop: "10%", marginLeft: "100px", width: "32%", height: "70%" }}>
          <Box className="signupcard-header" style={{ width: "100%", marginTop: "-80px", display: "flex", flexDirection: "row", marginBottom: "70px" }}>
            <Box sx={{ width: "100%", borderLeft: "none", display: "flex", flexDirection: "row", marginTop: "40px", marginLeft: "20px" }}>
              <Box sx={{ width: "65%", borderLeft: "none", marginLeft: "15%", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "40%",
                  marginLeft: "25%"
                }}
                >
                  <Avatar style={{ m: 1, bgcolor: "secondary.main" }}>
                    <img width={'100%'} src={signmup} >
                    </img>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={formik.handleSubmit}
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      marginLeft: "0px",
                    }}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  ) : null}

                  <br />
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      marginLeft: "0px",
                    }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                  <br />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      marginLeft: "0px",
                    }}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  ) : null}

                  <br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{
                      mt: 3, mb: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: ""
                    }}
                    style={{
                      width: "55%",
                      marginTop: "15px",
                      fontSize: "16px"
                    }}
                  >
                    Sign Up
                  </Button>
                  <Link className="signtext" to="/SignIn" style={{fontSize: "16px"}}>
                    Are you already a member?
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
