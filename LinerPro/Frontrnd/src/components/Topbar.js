import * as React from "react";
import '../style/Topbar.css';
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { global } from "../App";
import { useContext } from "react";
import Button from "@mui/material/Button";
import friendRequest from "../img/friendRequest.jpg";
import home from "../img/home.png";
import mypost from "../img/mypost.png";

const Topbar = () => {
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
            <div className='Topbar' style={{ background: "#063970", marginBottom: "0px", border: "1px solid black", display: "flex", flexDirection: "row", }}>
                <Link to="/MainMenu" style={{ margin: "10px", marginLeft: "25%" }}>
                    <Avatar style={{ width: "35px", height: "35px", borderRadius: "35/2" }} src={home} >
                    </Avatar>
                </Link>
                <Link to="/friendrequest" style={{ marginTop: "10px", marginLeft: "17%" }}>
                    <Avatar style={{ width: "35px", height: "35px", borderRadius: "35/2" }} src={friendRequest} >
                    </Avatar>
                </Link>
                <Link to="/MyPost" style={{ marginTop: "10px", marginLeft: "17%"}}>
                    <Avatar style={{ width: "35px", height: "35px", borderRadius: "35/2" }} src={mypost} >
                    </Avatar>
                </Link>
            </div>

        </>
    );
};

export default Topbar;