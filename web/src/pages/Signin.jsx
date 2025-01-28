import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Container,
  Card,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://localhost:5173/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password. Please try again.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Redirect to another route on successful sign-in
      navigate("/Initial", { state: { userData: data } });

      // Snackbar success message
      setSnackbarMessage("Sign-in successful!");
      setIsError(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Sign-in failed. Please check your credentials.");
      setIsError(true);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex justify-center items-center">
      <Container component="main" maxWidth="xs">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white",
            p: 6,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h1" className="text-indigo-600 text-center mb-6">
            Sign In
          </Typography>

          {/* Snackbar for feedback */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert severity={isError ? "error" : "success"}>{snackbarMessage}</Alert>
          </Snackbar>

          <form className="w-full" noValidate onSubmit={handleSignIn}>
            {/* Email Input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              className="mb-4"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                transition: "all 0.3s ease",
                "&:focus-within": {
                  borderColor: "#3f51b5",
                },
              }}
            />

            {/* Password Input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mb-6"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                transition: "all 0.3s ease",
                "&:focus-within": {
                  borderColor: "#3f51b5",
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    aria-label="toggle password visibility"
                    sx={{
                      color: "gray",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            {/* Sign-In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="py-4 mb-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            {/* Sign-Up Link */}
            <div className="text-center">
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-indigo-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                >
                  Sign Up
                </a>
              </Typography>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default SignInPage;
