import React, { useState } from "react";
import axios from "axios";
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
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/login", // Your backend API for login
        {
          email,
          password,
        },
        {
          withCredentials: true, // Send cookies with the request for cross-origin requests
        }
      );

      if (res.data.success) {
        window.location.href = "/quiz";
      }

      setLoading(false);
      setSnackbarMessage("Sign In Successful");
      setOpenSnackbar(true);
      setIsError(false);
    } catch (error) {
      setLoading(false);
      setSnackbarMessage("Invalid email or password");
      setOpenSnackbar(true);
      setIsError(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 to-blue-600 min-h-screen flex justify-center items-center">
      <Container component="main" maxWidth="xs">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white", // White background for the form
            p: 6,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            className="text-blue-600 text-center mb-6"
          >
            Log In
          </Typography>

          {/* Snackbar for feedback */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert severity={isError ? "error" : "success"}>
              {snackbarMessage}
            </Alert>
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
            />

            {/* Password Input with Visibility Toggle */}
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
              className="py-4 mb-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <LockOutlined className="mr-2" />
                  Log In
                </>
              )}
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Typography variant="body2" color="textSecondary">
                <a
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </Typography>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
