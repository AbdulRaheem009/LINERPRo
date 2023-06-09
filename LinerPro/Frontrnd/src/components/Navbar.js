import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import logo from "../img/logos.png";
import "../style/Navbar.css";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { global } from "../App";
import ListIcon from "@mui/icons-material/List";
import { height } from "@mui/system";

const pages = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "#About" },
  { name: "Contact Us", link: "#ContactUs" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(global);
  const userId = !!user.id;
  console.log(user.Name)
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logoutUser = () => {
    window.sessionStorage.clear();
    setUser({});
    navigate('/SignIn', { replace: true });
  };
  return (
    <AppBar position="fixed" elevation={0} className="appbar">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Box>
            <Link to="/" style={{ textDecoration: "none", marginRight: "100px" }}>
              <img src={logo} className="logoImg" />
            </Link>
          </Box>
          {!userId ? (
            <Box sx={{ display: "flex"}}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  marginRight: "60px",
                }}
              >
                {pages.map((page) => (
                  <a href={page.link} key={page.name}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  </a>
                ))}
              </Box>
             
              <Box style={{ display: "flex", marginTop: "5px" }}>
                <Link to="/SignIn" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="Meduim"
                    color="success"
                    className="navButton"
                    style={{width: "100px", height: "35px", marginTop: "50%"}}
                  >
                    Sign In
                  </Button>
                </Link>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    className="menuButton"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <a href={page.link}>
                          <Typography textAlign="center">
                            {page.name}
                          </Typography>
                        </a>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box style={{ display: "flex" }}>
              <Typography
                sx={{ marginTop: "10px", marginRight: "20px", color: "black" }}
              >
                Hello, {user.Name}
              </Typography>
              <Link to="/" style={{marginTop: "8px", marginLeft: "15px"}}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={logoutUser}
                  style={{
                    width: "100px",
                    height: "30px"
                  }}
                >
                  Log out
                </Button>
               
              </Link>
              <Link to="/mainMenu" style={{marginRight: "10px"}}>
                <Button variant="text" style={{ marginLeft: "5px" }}>
                  <ListIcon style={{ color: "black" }} fontSize="large"/>
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;