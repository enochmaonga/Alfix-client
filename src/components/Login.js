import React, { useState } from "react";
import { SERVER_URL } from "../config";
import { TextField, Button, Box, Paper, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response Status:", response.status);
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const userType = data.userType;

        console.log("Received Data:", data);

        // Store the token in localStorage or a secure storage method
        localStorage.setItem("token", token);

        console.log("Login successful", data);

        // Redirect based on user type
        if (userType === "Technician") {
          router.push("/repaircenter");
        } else {
          router.push("/booking");
        }
      } else {
        console.log("Login failed", response);
        setError("Check your username or password and try again");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in.");
    }
  };

  console.log("Username:", username);
  console.log("Password:", password);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 16, color: "#873600 " }}
      >
        <Grid>
          <Typography variant="h3">Welcome to Alfix Service Zone</Typography>
          <Typography
            variant="h6"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Kindly login to continue
          </Typography>
        </Grid>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Paper
          elevation={3}
          style={{ padding: "20px" }}
          xs={12}
          sm={8}
          md={4}
          xl={3}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">Login</Typography>
          </Box>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ backgroundColor: "#A6ACAF" }}
          >
            Login
          </Button>
          {error && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "10px" }}
            >
              {error}
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Login;
