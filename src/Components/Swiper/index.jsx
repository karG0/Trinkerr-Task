import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import Header from "../Header";
import ONE from "../../assets/images/one.png";
import TWO from "../../assets/images/two.png";
import THREE from "../../assets/images/three.png";
import FOUR from "../../assets/images/four.png";
import FIVE from "../../assets/images/five.png";

const images = [
  {
    label: "One",
    imgPath: ONE,
  },
  {
    label: "Two",
    imgPath: TWO,
  },
  {
    label: "Three",
    imgPath: THREE,
  },
  {
    label: "Four",
    imgPath: FOUR,
  },
  {
    label: "Five",
    imgPath: FIVE,
  },
];

function SwipeableTextMobileStepper() {
  const { enqueueSnackbar } = useSnackbar();
  let getImageidx = localStorage.getItem("imgIndex");
  const [imgIndex, setImgIndex] = useState(Number(getImageidx) || 0);
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;
  const imgIndexRef = useRef(imgIndex);
  imgIndexRef.current = imgIndex;
  const [selectedImg, setSelectedImg] = useState();
  const [seletedImages, setSeltedImages] = useState([]);
  const [rejectedImages, setRejectedImages] = useState([]);
  const { name: userName } = JSON.parse(localStorage.getItem("userDetails"));

  const handleSwipe = (type) => {
    setCount(0);
    let message = "",
      variant = "";
    if (type === "right") {
      message = `${userName} You have Selected ${selectedImg.label} Image`;
      variant = "success";
      setSeltedImages([...seletedImages, selectedImg]);
    } else {
      message = `${userName} You have Rejected ${selectedImg.label} Image`;
      variant = "warning";
      setRejectedImages([...rejectedImages, selectedImg]);
    }
    setImgIndex(imgIndex + 1);
    enqueueSnackbar(message, { variant, autoHideDuration: 2000 });
  };

  const startTimer = () => {
    setTimeout(() => {
      if (countRef.current < 5) {
        setCount((count) => count + 1);
      } else {
        setImgIndex((imgIndex) => imgIndex + 1);
        setCount(0);
      }
      images[imgIndexRef.current] && startTimer();
    }, 1000);
  };

  useEffect(() => {
    setSelectedImg(images[imgIndex]);
    localStorage.setItem("imgIndex", Number(imgIndex));
  }, [imgIndex]);

  useEffect(() => {
    enqueueSnackbar(`Welcome ${userName}`, {
      variant: "success",
      autoHideDuration: 2000,
    });
    startTimer();
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          marginTop: 8,
          flexGrow: 1,
        }}
      >
        {selectedImg ? (
          <Grid Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid
              container
              justifyContent="center"
              item
              xs={12}
              alignItems="center"
              justifyContent="center"
            >
              <Typography color="primary">{selectedImg?.label}</Typography>
            </Grid>
            <Grid
              container
              justifyContent="center"
              item
              xs={3}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="outlined"
                onClick={() => {
                  handleSwipe("left");
                }}
              >
                Swipe Left
              </Button>
            </Grid>
            <Grid container justifyContent="center" item xs={6}>
              <img
                style={{
                  maxHeight: "calc(100vh - 50px)",
                }}
                src={selectedImg?.imgPath}
                alt={selectedImg?.label}
                loading="lazy"
              />
            </Grid>
            <Grid
              container
              justifyContent="center"
              item
              xs={3}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="outlined"
                onClick={() => {
                  handleSwipe("right");
                }}
              >
                Swipe Right
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid
              container
              justifyContent="center"
              item
              xs={12}
              alignItems="center"
              justifyContent="center"
            >
              <Typography color="primary" variant="h5">
                you have rated all the images. Thank You!
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default SwipeableTextMobileStepper;
