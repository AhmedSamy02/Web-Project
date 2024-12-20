import React, { useState } from "react";
import { Grid, Paper ,Box} from "@mui/material";
import ProfilePage from "./ProfilePage";
export default function Profile() {
  // Static user data
  const userData = {
    name: "John Doe",
    userName: "john_doe",
    email: "john.doe@example.com",
    gender: "male",
    city: "Springfield",
    address: "123 Main St",
    birthDate: new Date("1990-01-15"),
    role: "user",
  };

  return (
    <Box>
            <ProfilePage data={userData} />
      </Box>
  );
}
