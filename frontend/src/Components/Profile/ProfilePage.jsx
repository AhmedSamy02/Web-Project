import React, { useState } from "react";
import { 
    Container, 
    Grid, 
    TextField, 
    Button, 
    Typography, 
    Snackbar 
} from "@mui/material"; 
import axios from 'axios'; // Import Axios

const ProfilePage = (props) => {
    const [username, setUsername] = useState(props.data.username);
    const [email, setEmail] = useState(props.data.email);
    const [newPassword, setNewPassword] = useState(""); // State for new password
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success messages

    // Function to handle username update
    const handleUsernameUpdate = async () => {
        const body = {
            username,
            userId: props.data._id,
        };

        try {
            const response = await axios.put('http://localhost:3001/fan/edit', body, { 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            setSuccessMessage("Username updated successfully!");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log("Username updated successfully:", response.data);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.msg); // Specific error from server
            } else {
                setErrorMessage("Server error: " + error.message); // Handle other errors
            }
        }
    };

    // Function to handle email update
    const handleEmailUpdate = async () => {
        const body = {
            email,
            userId: props.data._id,
        };

        try {
            const response = await axios.put('http://localhost:3001/fan/edit', body, { 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            setSuccessMessage("Email updated successfully!");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log("Email updated successfully:", response.data);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.msg); // Specific error from server
            } else {
                setErrorMessage("Server error: " + error.message); // Handle other errors
            }
        }
    };

    // Function to handle password update
    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("New passwords do not match");
            return;
        }

        const body = {
            password: newPassword,
            userId: props.data._id,
            oldPassword: props.data.oldPassword // Assuming oldPassword is passed in props.data
        };

        try {
            const response = await axios.put('http://localhost:3001/fan/edit', body, { 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            // Clear password fields after successful update
            setNewPassword("");
            setConfirmPassword("");

            setSuccessMessage("Password updated successfully!");
            console.log("Password updated successfully:", response.data);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.msg); // Specific error from server
            } else {
                setErrorMessage("Server error: " + error.message); // Handle other errors
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Profile
            </Typography>
            
            <Grid container spacing={3}>
                {/* Row for Username */}
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        type="button" 
                        variant="contained" 
                        color="success" 
                        onClick={handleUsernameUpdate} // Update username
                    >
                        Update Username
                    </Button>
                </Grid>

                {/* Row for Email */}
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        type="button" 
                        variant="contained" 
                        color="success" 
                        onClick={handleEmailUpdate} // Update email
                    >
                        Update Email
                    </Button>
                </Grid>

                {/* Row for New Password Fields */}
                <Grid item xs={12} md={6}>
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        type="button" 
                        variant="contained" 
                        color="success" 
                        onClick={handlePasswordUpdate}
                    >
                        Change Password
                    </Button>
                </Grid>
            </Grid>

            {/* Display error messages */}
            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={6000}
                onClose={() => setErrorMessage("")}
                message={errorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
            {/* Display success messages */}
            <Snackbar
                open={Boolean(successMessage)}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage("")}
                message={successMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Container>
    );
};

export default ProfilePage;
