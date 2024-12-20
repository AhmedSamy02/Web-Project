import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FaCalendarAlt } from "react-icons/fa";

const MatchCard = ({ matchDetails, onEdit }) => {
  const { homeTeam, awayTeam, venue, dateTime, linesmen, mainReferee } = matchDetails;
  const data = localStorage.getItem("user");
  const userType = JSON.parse(data).role;
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", pin: "" });
  const [stadiumSize, setStadiumSize] = useState({ numberOfRows: 0, numberOfSeatsPerRow: 0 });

  const getStadiumSize = async (venue) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3001/manager/stadium/${venue}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStadiumSize(response.data);
    } catch (error) {
      console.error("Error fetching stadium size:", error);
    }
  };

  const handleOpenBooking = () => {
    if (userType === "guest") {
      alert("Please log in to book tickets.");
    } else if (userType === "admin") {
      alert("Admins cannot book tickets.");
    } else {
      getStadiumSize(venue);
      setOpenBooking(true);
    }
  };

  const handleCloseBooking = () => {
    setOpenBooking(false);
    setSelectedSeat(null);
    setPaymentInfo({ cardNumber: "", pin: "" });
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const handlePayment = () => {
    if (paymentInfo.cardNumber && paymentInfo.pin) {
      alert(`Ticket booked for seat ${selectedSeat}!`);
      handleCloseBooking();
    } else {
      alert("Please enter valid payment details.");
    }
  };

  const seats = Array.from({ length: stadiumSize.numberOfRows }, (_, rowIndex) =>
    Array.from(
      { length: stadiumSize.numberOfSeatsPerRow },
      (_, seatIndex) => `Row ${rowIndex + 1}, Seat ${seatIndex + 1}`
    )
  ).flat();

  // Parse dateTime to get match date and time
  const matchDate = new Date(dateTime).toLocaleDateString(); 
  const matchTime = new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 3,
        boxShadow: 3,
        borderRadius: 2,
        width: "80%",
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" align="center">
              {homeTeam}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="text.secondary" align="center">
              vs
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              {awayTeam}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Typography variant="body1" color="text.secondary" align="center">
            <strong>Venue: {venue}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            <FaCalendarAlt /> {matchDate} | {matchTime}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            <strong>Main Referee: {mainReferee}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            <strong>Linesmen: {linesmen.join(", ")}</strong>
          </Typography>
        </Box>

        <Box sx={{ marginTop: 2, textAlign: "center" }}>
          {matchDetails.availability ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenBooking}
              sx={{ width: "100%", fontWeight: "bold", fontSize: "16px" }}
            >
              Book Ticket
            </Button>
          ) : (
            <Typography variant="body1" color="error" align="center">
              Booking Closed
            </Typography>
          )}
        </Box>
        {(userType === "Manager" )?
        <Box sx={{ marginTop: 2, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onEdit} 
            sx={{ width: "100%", fontWeight: "bold", fontSize: "16px" }}
          >
            Edit Match
          </Button>
        </Box>:null}
      </CardContent>

      {/* Booking Dialog */}
      <Dialog open={openBooking} onClose={handleCloseBooking} fullWidth maxWidth="sm">
        <DialogTitle>Book Your Seat</DialogTitle>
        <DialogContent>
          {!selectedSeat ? (
            <>
              <Typography variant="h6" gutterBottom>
                Select a Seat:
              </Typography>
              <Grid container spacing={1}>
                {seats.map((seat, index) => (
                  <Grid item xs={3} key={index}>
                    <Button
                      variant={selectedSeat === seat ? "contained" : "outlined"}
                      color={selectedSeat === seat ? "primary" : "default"}
                      fullWidth
                      onClick={() => handleSeatSelection(seat)}
                    >
                      {seat}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Enter Payment Details:
              </Typography>
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="PIN"
                variant="outlined"
                type="password"
                value={paymentInfo.pin}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, pin: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBooking} color="secondary">
            Cancel
          </Button>
          {!selectedSeat ? (
            <Button onClick={() => alert("Please select a seat.")} color="primary" disabled>
              Next
            </Button>
          ) : (
            <Button onClick={handlePayment} color="primary">
              Pay
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};



const ViewMatches = () => {
  const data = localStorage.getItem("user");
  const userType = JSON.parse(data).role;
  const [openDialog, setOpenDialog] = useState(false);
  const [editMatch, setEditMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [newMatch, setNewMatch] = useState({
    homeTeam: "",
    awayTeam: "",
    venue: "",
    dateTime: "",
    mainReferee: "",
    linesmen: ["", ""],
    availability: true,
  });

  const fetchMatches = async () => {
    try {
      const response = await axios.get("http://localhost:3001/manager/allMatches");
      const updatedMatches = response.data.map(match => ({
        ...match,
        availability: !isMatchTodayOrTomorrow(match.dateTime) // Set availability based on today or tomorrow
      }));
      setMatches(updatedMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const isMatchTodayOrTomorrow = (dateTime) => {
    const matchDate = new Date(dateTime);
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return matchDate.toDateString() === now.toDateString() || matchDate.toDateString() === tomorrow.toDateString();
  };

  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/manager/allTeams", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchStadiums = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/manager/allStadium", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStadiums(response.data);
    } catch (error) {
      console.error("Error fetching stadiums:", error);
    }
  };

  const handleCreate = () => {
    setNewMatch({
      homeTeam: "",
      awayTeam: "",
      venue: "",
      dateTime: "",
      mainReferee: "",
      linesmen: ["", ""],
      availability: true, // Set to true by default
    });
    setOpenDialog(true);
  };

  const handleEdit = (match) => {
    setEditMatch(match);
    setNewMatch(match);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (editMatch) {
        await axios.put(`http://localhost:3001/manager/updateMatch`, newMatch, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post("http://localhost:3001/manager/addMatch", newMatch, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setOpenDialog(false);
      fetchMatches();
    } catch (error) {
      console.error("Error saving match:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
    fetchTeams();  
    fetchStadiums();
  }, []);

  const getFilteredTeamsForAway = () => {
    return teams.filter(team => team.name !== newMatch.homeTeam);
  };

  const getFilteredTeamsForHome = () => {
    return teams.filter(team => team.name !== newMatch.awayTeam);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 3 }}>
      <Typography variant="h4" color="green" sx={{ marginBottom: 3 }}>
        Upcoming Matches
      </Typography>
      {matches.map((match, index) => (
        <Box key={index} sx={{ marginBottom: 3, width: "70%", display: "flex", justifyContent: "center" }}>
          <MatchCard matchDetails={match} onEdit={() => handleEdit(match)} />
        </Box>
      ))}
    
    {(userType === "Manager") ?
      <Button variant="contained" color="success" onClick={handleCreate} sx={{ marginBottom: 3 }}>
        Create New Match
      </Button>
: null}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editMatch ? "Edit Match" : "Create Match"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            select
            value={newMatch.homeTeam}
            onChange={(e) => setNewMatch({ ...newMatch, homeTeam: e.target.value })}
            SelectProps={{ native: true }}
            sx={{ marginBottom: 2 }}
          >
            <option value="">Select Home Team</option>
            {getFilteredTeamsForHome().map((team) => (
              <option key={team._id} value={team.name}>{team.name}</option>
            ))}
          </TextField>

          <TextField
            fullWidth
            variant="outlined"
            select
            value={newMatch.awayTeam}
            onChange={(e) => setNewMatch({ ...newMatch, awayTeam: e.target.value })}
            SelectProps={{ native: true }}
            sx={{ marginBottom: 2 }}
          >
            <option value="">Select Away Team</option>
            {getFilteredTeamsForAway().map((team) => (
              <option key={team._id} value={team.name}>{team.name}</option>
            ))}
          </TextField>

          <TextField
            fullWidth
            variant="outlined"
            select
            value={newMatch.venue}
            onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
            SelectProps={{ native: true }}
            sx={{ marginBottom: 2 }}
          >
            <option value="">Select Venue</option>
            {stadiums.map((stadium) => (
              <option key={stadium._id} value={stadium.name}>{stadium.name}</option>
            ))}
          </TextField>

          <TextField
            fullWidth
            variant="outlined"
            value={newMatch.dateTime.split('T')[0]}
            onChange={(e) => setNewMatch({ ...newMatch, dateTime: e.target.value })}
            sx={{ marginBottom: 2 }}
            type="date"
            inputProps={{ min: new Date().toISOString().split("T")[0] }} // Prevent past date selection
          />

          <TextField
            fullWidth
            variant="outlined"
            value={newMatch.dateTime.split('T')[1] ? newMatch.dateTime.split('T')[1].slice(0, 5) : ''}
            onChange={(e) => setNewMatch({ ...newMatch, dateTime: newMatch.dateTime.split('T')[0] + 'T' + e.target.value + ':00' })}
            sx={{ marginBottom: 2 }}
            type="time"
          />

          <TextField
            fullWidth
            label="Main Referee"
            variant="outlined"
            value={newMatch.mainReferee}
            onChange={(e) => setNewMatch({ ...newMatch, mainReferee: e.target.value })}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Linesmen"
            variant="outlined"
            value={newMatch.linesmen.join(" & ")}
            onChange={(e) => setNewMatch({ ...newMatch, linesmen: e.target.value.split(" & ") })}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSave} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewMatches;
