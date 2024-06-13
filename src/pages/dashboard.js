import React from "react";
import { Container, Grid } from "@mui/material";
import Head from "next/head";
import LeftDrawer from "@/components/Drawer";
import SectionOne from "@/components/dashboard/SectionOne";
import Users from "@/components/dashboard/Users";

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
          <SectionOne />
          <Users />
        </Grid>
      </Grid>
    </>
  );
};

export default Customer1;
