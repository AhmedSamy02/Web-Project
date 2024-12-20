import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import User from "./User";
import axios from "axios";

export default function PendingUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = localStorage.getItem("user");
        const role = JSON.parse(data).role;
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3001/admin/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
            Role: role,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle approve or disapprove action
  const handleUserAction = async (userId, action) => {
    try {
      const data = localStorage.getItem("user");
      const role = JSON.parse(data).role;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3001/admin/approve",
        { userId, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Role: role,
          },
        }
      );

      if (response.status === 200) {
        // Update the state to remove the approved/disapproved user
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      alert(`Failed to ${action} user: ${error.message}`); // Show error alert
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header */}
      <Box sx={{ marginBottom: 2, textAlign: "center" }}>
        <Typography variant="h5" component="div">
          Requests
        </Typography>
      </Box>

      {/* Loading Indicator */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Typography variant="h6" color="textSecondary" textAlign="center">
          No pending requests at the moment.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={3} key={user._id}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: 2,
                  textAlign: "center",
                }}
              >
                {/* User Component */}
                <User user={user} />

                {/* Approve and Disapprove Buttons */}
                <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-around" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUserAction(user._id, "approve")} // Use _id here
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleUserAction(user._id, "disapprove")} // Use _id here
                  >
                    Disapprove
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
