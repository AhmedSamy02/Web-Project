import React, { useState } from "react";
import {
    Container,
    Grid,
    TextField,
    Button,
    MenuItem,
    Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const ProfilePage = (props) => {
    const [name, setFName] = useState(props.data.name);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedDate, setSelectedDate] = useState(props.data.birthDate);
    const [gender, setGender] = useState(props.data.gender);
    const [city, setCity] = useState(props.data.city);
    const [address, setAddress] = useState(props.data.address);

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            name: name,
            gender,
            address,
            city,
            birthDate: selectedDate,
        };
        console.log("Updated Data:", body);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Profile
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* First Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setFName(e.target.value)}
                        />
                    </Grid>

                    {/* Password */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>

                    {/* Confirm Password */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>

                    {/* Gender */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            select
                            label="Gender"
                            fullWidth
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </TextField>
                    </Grid>

                    {/* City */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="City"
                            fullWidth
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} md={12}>
                        <TextField
                            label="Address"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>

                    {/* Birthdate */}
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Birthdate"
                                value={selectedDate}
                                onChange={(newDate) => setSelectedDate(newDate)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="success">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ProfilePage;
