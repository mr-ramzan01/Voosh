import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const theme = createTheme();

export const Signup = () => {
  const [data, setData] = useState({ name: "", phoneNumber: "", password: "" });
  const [passwordError, setPasswordError] = useState({
    error: false,
    text: "",
  });
  const [phoneNumberError, setPhoneNumberError] = useState({
    error: false,
    text: "",
  });
    const {setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Storing the data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "phoneNumber" && value.length > 0 && value.length !== 10) {
      setPhoneNumberError({
        ...phoneNumberError,
        error: true,
        text: "Phone Number must be 10 digits only",
      });
    } else {
      setPhoneNumberError({
        ...phoneNumberError,
        error: false,
        text: "",
      });
    }
  };

  // Submitting the data of user
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.phoneNumber.length !== 10) {
      console.log("here");
      setPhoneNumberError({
        ...phoneNumberError,
        error: true,
        text: "Phone Number must be 10 digits only",
      });
      return;
    }

    fetch("/users/add-user", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
            setIsAuth(true);
          alert(res.message);
          navigate("/");
        } else {
          setPhoneNumberError({
            ...phoneNumberError,
            error: true,
            text: "User alredy exist",
          });
        }
      })
      .catch((err) => {
        console.log(err, "response error");
        alert("Something went wrong! Internal server error");
      });
  };
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              padding: "20px",
              bgcolor: "#fff",
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
              marginTop: 8,
              mb: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              fontFamily="'Dancing Script', cursive"
              component="h1"
              variant="h3"
            >
              Voosh
            </Typography>
            <Typography sx={{ mt: 2 }} component="h1" variant="h5">
              SignUp
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                color="secondary"
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#303030",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#303030",
                    },
                  },
                  borderRadius: "5px",
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                }}
                label="Name"
                name="name"
                autoComplete="off"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                color="secondary"
                required
                fullWidth
                type="number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#303030",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#303030",
                    },
                  },
                  borderRadius: "5px",
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                }}
                label="phone number"
                name="phoneNumber"
                autoComplete="off"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                onChange={handleChange}
                error={phoneNumberError.error}
                helperText={phoneNumberError.text}
              />
              <TextField
                margin="normal"
                color="secondary"
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#303030",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#303030",
                    },
                  },
                }}
                name="password"
                label="Password"
                type="password"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                inputProps={{ minLength: 8 }}
                onChange={handleChange}
                error={passwordError.error}
                helperText={passwordError.text}
              />
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{
                  mt: 4,
                  mb: 4,
                  background: "#303030",
                  "&:hover": {
                    background: "#000",
                  },
                }}
              >
                Sign Up
              </Button>
              <Grid justifyContent="center" container>
                <Grid item>
                  <Typography fontSize={13}>
                    {"Don't have an account? "}
                    <Link
                      href="/login"
                      underline="hover"
                      fontSize={13}
                      color="#000"
                    >
                      {" login"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};
