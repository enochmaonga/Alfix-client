import React from "react";
import { Container, Grid } from "@mui/material";
import Head from "next/head";
import Booking from "@/components/Booking";
import LeftDrawer from "@/components/Drawer";

const Customer1 = () => {
  return (
    <>
      <Head>
        <title> Alfix | Booking</title>
      </Head>

      <Grid Container>
        <Grid item>
          <LeftDrawer />
        </Grid>
        <Grid item sx={{ marginLeft: "280px", mr: 4 }}>
          <Booking />
        </Grid>
      </Grid>
    </>
  );
};

export default Customer1;
