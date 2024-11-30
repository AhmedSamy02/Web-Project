import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Matches from "./Components/Matches/Matches";
import Register from "./Components/Auth/Register";
function App() {
  const theme = createTheme(); // Default MUI theme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/matches" element={<Matches />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
