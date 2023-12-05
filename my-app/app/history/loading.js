"use client";

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


function loading() {
  return (     
    <Box
    className="h-[100vh] w-[100vw] flex justify-center items-center"
    sx={{ display: "flex" }}
  >
    <CircularProgress color="success" />
  </Box>
  );
}

export default loading;
