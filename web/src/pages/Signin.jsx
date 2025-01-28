import React, { useState } from "react";
import { Button, CircularProgress, TextField, Typography, Box, Container, Card, Snackbar, Alert, IconButton } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);

    setTimeout(() => {
      setLoading(false);
      if (email === "test@example.com" && password === "password") {
        setSnackbarMessage("Sign In Successful");
        setOpenSnackbar(true);
        setIsError(false);
      } else {
        setSnackbarMessage("Invalid email or password");
        setOpenSnackbar(true);
        setIsError(true);
      }
    }, 2000);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs" className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
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
        <Typography variant="h5" component="h1" className="text-blue-600 text-center mb-6">
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
            helperText={email && !email.includes('@') ? "Please enter a valid email" : ""}
            error={email && !email.includes('@')}
            InputLabelProps={{
              shrink: true, // For better focus
            }}
            sx={{
              transition: "all 0.3s ease",
              "&:focus-within": {
                borderColor: "#3f51b5",
              },
            }}
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
            helperText={password && password.length < 6 ? "Password must be at least 6 characters" : ""}
            error={password && password.length < 6}
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
            className="py-4 mb-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <LockOutlined className="mr-2" />
                Sign In
              </>
            )}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Typography variant="body2" color="textSecondary">
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </Typography>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default SignInPage;
