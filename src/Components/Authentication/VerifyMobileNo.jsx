import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";

export default function Login(props) {
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { type, setIsValidated, setUserDeatils } = props;
  const [mobileNumber, setMobileNumber] = useState();

  const onMobileNoChange = (e) => {
    let telephone = e.target.value;
    if (isNaN(telephone) || telephone.length - 1 >= 10) {
      e.target.value = mobileNumber || "";
      return;
    }
    setMobileNumber(telephone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      mobilenumber: data.get("mobilenumber"),
      otp: data.get("otp"),
    };

    if (type === "signup") {
      if (userDetails?.mobilenumber.length !== 10 || userDetails.otp != "0000") {
        enqueueSnackbar(
          "Please Enter Correct Mobile Number or OTP is Invalid",
          {
            variant: "error",
            autoHideDuration: 2000,
          }
        );
        return;
      }
      setIsValidated && setIsValidated(true);
      setUserDeatils && setUserDeatils(userDetails);
    } else {
      const getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (
        getUserDetails?.mobilenumber !== userDetails?.mobilenumber ||
        userDetails?.otp !== "0000"
      ) {
        enqueueSnackbar("Mobile Number or OTP is Invalid", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return;
      }
      history.push("/swiper");
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {type === "signup" ? "Sign Up" : "Sign In"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="mobilenumber"
          label="Mobile Number"
          name="mobilenumber"
          type="text"
          value={mobileNumber}
          onChange={onMobileNoChange}
          autoFocus
        />
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button size={"small"} endIcon={<SendIcon />}>
            Get OTP
          </Button>
        </Grid>
        <TextField
          margin="normal"
          required
          fullWidth
          name="otp"
          label="OTP"
          type="password"
          id="otp"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {type === "signup" ? "Verify OTP" : "Sign In"}
        </Button>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                const path = type === "signup" ? "/signin" : "/";
                history.push(path);
              }}
            >
              {type === "signup"
                ? "Have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
