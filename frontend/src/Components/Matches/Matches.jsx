import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button, Divider } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavBar from "../NavBar/NavBar";

const MatchCard = ({ match }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 3,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          {/* Team Logos and Names */}
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box textAlign="center">
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e88e5" }}>
                  {match.team1}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#757575",
                    fontWeight: "bold",
                    margin: "10px 0",
                  }}
                >
                  VS
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#e53935" }}>
                  {match.team2}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Match Details */}
          <Grid item xs={12} md={5}>
            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <LocationOnIcon
                  sx={{ verticalAlign: "middle", marginRight: 1, color: "#43a047" }}
                />
                <strong>{match.stadium}</strong>, {match.city}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <CalendarTodayIcon
                  sx={{ verticalAlign: "middle", marginRight: 1, color: "#ffa000" }}
                />
                <strong>{match.date}</strong>, {match.time}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Tournament: <strong>{match.tournament}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Group: <strong>{match.group}</strong>
              </Typography>
            </Box>
          </Grid>

          {/* Match Status or Action */}
          <Grid item xs={12} md={3}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              height="100%"
              flexDirection="column"
            >
              {match.status === "Match Ended" ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#bdbdbd",
                    color: "#fff",
                    width: "100%",
                    cursor: "default",
                  }}
                  disabled
                >
                  Match Ended
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#43a047",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#2e7d32" },
                    width: "100%",
                  }}
                >
                  Book Ticket
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Matches = () => {
  const matches = [
    {
      team1: "ZED FC",
      team2: "Haras El Hodoud SC",
      stadium: "Al Salam Stadium",
      city: "Cairo",
      date: "Sat 30 Nov 2024",
      time: "05:00 PM",
      tournament: "EPL 2024/2025",
      group: "Week Four",
      status: "Match Ended",
    },
    {
      team1: "Ceramica Cleopatra FC",
      team2: "Modern Sport Club",
      stadium: "Arab Contractors Stadium",
      city: "Cairo",
      date: "Sat 30 Nov 2024",
      time: "05:00 PM",
      tournament: "EPL 2024/2025",
      group: "Week Four",
      status: "Match Ended",
    },
    {
      team1: "Alithad Alexandria",
      team2: "Tala'ea El Gaish SC",
      stadium: "Alexandria Stadium",
      city: "Alex",
      date: "Sat 30 Nov 2024",
      time: "08:00 PM",
      tournament: "EPL 2024/2025",
      group: "Week Four",
      status: "Available",
    },
    {
      team1: "NBE Club",
      team2: "Al Ahly FC",
      stadium: "Al Salam Stadium",
      city: "Cairo",
      date: "Sun 01 Dec 2024",
      time: "05:00 PM",
      tournament: "EPL 2024/2025",
      group: "Week Four",
      status: "Available",
    },
  ];

  return (
    <Box>
        <NavBar />
    <Box sx={{ padding: 3, backgroundColor: "#f1f1f1" }}>
      {matches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </Box>
    </Box>
  );
};

export default Matches;
