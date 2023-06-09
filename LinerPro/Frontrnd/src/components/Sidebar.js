import * as React from "react";
import '../style/sidebar.css';
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { global } from "../App";
import { useContext } from "react";
import Button from "@mui/material/Button";
import friends from "../img/friends.jpg";
import home from "../img/home.png";
import download from "../img/download.png";
import translate from "../img/translate.png";
import listen from "../img/listen.png";
import important from "../img/important.png";
import signupimage from "../img/signupimage.jpeg";
import articlehistory from "../img/articlehistory.png";
import mypost from "../img/mypost.png";
import MDB, { MDBIcon } from "mdb-react-ui-kit";
const Sidebar = () => {
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
    return (
        <>
            <div className='sidebar' style={{ background: "#f0f2f5" }}>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "35px", marginLeft: "15px", marginTop: "50px" }}>
                    <img style={{ width: "60px", height: "60px", borderRadius: "100%" }} src={signupimage}>
                    </img>
                    <Typography sx={{ marginLeft: "10px", color: "black", marginTop: "20px" }}>
                        {user.Name}
                    </Typography>
                </div>
                <div style={{ marginTop: "25px", marginLeft: "25px" }}>
                    <Link to="/MyPost" style={{ display: "flex", flexDirection: "row" }}>
                        <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={mypost} >
                        </img>
                        <Button variant="text" style={{ textDecoration: "none", color: "black", display: "block", fontSize: "20px", marginLeft: "10px" }}>
                            My Post
                        </Button>
                    </Link>
                    <Link to="/mainMenu" style={{ display: "flex", flexDirection: "row" }}>
                        <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={home} >
                        </img>
                        <Button variant="text" style={{ textDecoration: "none", color: "black", display: "block", fontSize: "20px", marginLeft: "10px" }}>
                            Home
                        </Button>
                    </Link>
                    <Link to="/downloadHighlight" style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
                        <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={download} >
                        </img>
                        <Button variant="text" style={{ textDecoration: "none", color: "black", display: "block", fontSize: "20px", marginLeft: "10px" }}>
                            Download
                        </Button>
                    </Link>
                    <Link to="/Translate" style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
                        <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={translate} >
                        </img>
                        <Button variant="text" style={{ textDecoration: "none", color: "black", display: "block", fontSize: "20px", marginLeft: "10px" }}>
                            Translate
                        </Button>
                    </Link>
                    <Link to="/Listen" style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
                        <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={listen} >
                        </img>
                        <Button variant="text" style={{ textDecoration: "none", color: "black", display: "block", fontSize: "20px", marginLeft: "10px" }}>
                            Listen
                        </Button>
                    </Link>
                    <Link to="/Importance" style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
                        <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={important} >
                        </img>
                        <Button variant="text" style={{ textDecoration: "none", color: "black", display: "block", fontSize: "20px", marginLeft: "10px" }}>
                            Importance
                        </Button>
                    </Link>
                    <Link to="/ArticalHistory" style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
                        <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={articlehistory} >
                        </img>
                        <Button variant="text" style={{ textDecoration: "none", color: "black", display: "block", fontSize: "20px", marginLeft: "10px" }}>
                            Article History
                        </Button>
                    </Link>
                </div>
            </div>

        </>
    );
};

export default Sidebar;