import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LocationOn, Email, Wc, Cake, Person } from "@mui/icons-material";

export default function User(props) {
  const { user } = props;

  // Format birthdate
  const formatDate = (date) => {
    const birthDate = new Date(date);
    const day = birthDate.getDate().toString().padStart(2, "0");
    const month = (birthDate.getMonth() + 1).toString().padStart(2, "0");
    const year = birthDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <Card sx={{ maxWidth: 300, margin: "auto", boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        {/* Display Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <Person sx={{ fontSize: 40, marginRight: 1 }} />
          <Typography variant="h6" component="div">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>

        {/* Display Username */}
        {user.userName && (
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            gutterBottom
          >
            @{user.userName}
          </Typography>
        )}

        {/* Display City */}
        {user.city && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography variant="body2">{user.city}</Typography>
          </Box>
        )}

        {/* Display Address (Optional) */}
        {user.address && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography variant="body2">{user.address}</Typography>
          </Box>
        )}

        {/* Display Email */}
        {user.email && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Email sx={{ mr: 1 }} />
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        )}

        {/* Display Gender and Birthdate */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {user.gender && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Wc sx={{ mr: 1 }} />
              <Typography variant="body2">{user.gender}</Typography>
            </Box>
          )}
          {user.birthDate && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Cake sx={{ mr: 1 }} />
              <Typography variant="body2">{formatDate(user.birthDate)}</Typography>
            </Box>
          )}
        </Box>

        {/* Display Role */}
        {user.role && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Role: {user.role}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
