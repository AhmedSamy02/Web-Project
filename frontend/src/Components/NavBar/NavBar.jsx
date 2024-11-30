import React, { useState } from "react"; 
import {
    Box,
    IconButton,
    Typography,
    Avatar,
    Button
} from "@mui/material";
import FlexBetween from "../widgets/FlexBetween";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const fullName = "Kareem Samy";
    const navigate = useNavigate();
    const neutralLight = "#f3f3f3";

    const handleProfileClick = () => {
        alert("Go to profile");
    };

    const handleSignIn = () => {
        // setIsLoggedIn(true);
        navigate("/register");
    };

    const handleLogOut = () => {
        // setIsLoggedIn(false);
        alert("Logged Out");
    };

    return (
        <FlexBetween padding="0.7rem 6%" backgroundColor={"green"}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color='white'
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                            color: "transparent",
                        },
                    }}>
                    Tazkarti
                </Typography>
            </FlexBetween>
            {/* User-specific UI */}
            <FlexBetween gap="2rem">
                {isLoggedIn ? (
                    <>
                        {/* Avatar */}
                        <IconButton onClick={handleProfileClick}>
                            <Avatar alt={fullName} src="/path/to/profile/image.jpg" sx={{ width: "35px", height: "35px" }}/>
                        </IconButton>
                        <Button onClick={handleLogOut}>
                            <Typography color='white'>Log Out</Typography>
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleSignIn}>
                        <Typography color='white'>Sign In</Typography>
                    </Button>
                )}
            </FlexBetween>
        </FlexBetween>
    );
}
