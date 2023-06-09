import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect, useContext } from "react";
import { global } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signmupimage from "../img/signupimage.jpeg";
import signmup from "../img/signup.png";
import "../style/Signcard.css";


export default function SignIn() {
  const { userLogin } = useContext(global);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setUser({
        Email: values.email,
        Password: values.password,
      });
    },
  });

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/users/login", user, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res?.data.token);
        sessionStorage.setItem(
          "userToken",
          JSON.stringify(res?.data.token)
        );
        userLogin();
        navigate("/mainMenu");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, [navigate, userLogin, user]);
  return (
    <>
      <ToastContainer />
      <Box
        className="signupbackground" sx={{ marginLeft: "-10px", width: "100%", borderLeft: "none", display: "flex", flexDirection: "row"}}
      >
        <Box sx={{ width: "45%", borderLeft: "none", display: "flex", flexDirection: "row"}}>
          <Box className="signupcard" style={{ marginTop: "25%", marginLeft: "60px", width: "75%", height: "70%"}}>
            <Box className="signupcard-header" style={{ width: "150%", marginTop: "-80px", display: "flex", flexDirection: "row"}}>
              <Box style={{ width: "65%", display: "flex", flexDirection: "row", marginTop: "40px", marginLeft: "20px" }}>
                <Box sx={{ width: "65%", borderLeft: "none", marginLeft: "15%", justifyContent: "center", alignItems: "center"}}>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "50%",
                    marginLeft: "25%"
                  }}
                  >
                    <Avatar style={{ m: 1, bgcolor: "secondary.main" }}>
                      <img width={'100%'} src={signmup}>
                      </img>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
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
                      Sign in
                    </Button>
                    <Grid>
                      <Grid item xs>
                        <Link href="#" style={{ fontSize: "16px" }}>
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: "10px" }}>
                      <Link className="signtext" to="/SignUp" style={{ fontSize: "16px" }}>
                        Don't have an account?
                      </Link>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box></Box>

        </Box>
        <Box sx={{
          width: "58%",
          display: "flex",
          alignItems: "right",
        }}>
          <img src={signmupimage}>
          </img>
        </Box>
      </Box>
    </>
  );
}