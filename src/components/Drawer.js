import React from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Accessible,
  BookOnline,
  Dashboard,
  FeaturedPlayList,
  Home,
  HomeRepairService,
} from "@mui/icons-material";
import NextLink from "next/link";
import Image from "next/image";

const LeftDrawer = () => {
  const itemsList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#A6ACAF",
        height: "100%",
      }}
      role="drawer"
    >
      <Grid container sx={{ marginLeft: "20px", marginTop: "20px" }}>
        <Grid item md={3}>
          <Image src="/images/alfix.jpg" width={50} height={60} alt="logo" />
        </Grid>
        <Grid item md={6}>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", color: "#873600" }}
          >
            Alfix
          </Typography>
        </Grid>
      </Grid>

      <List>
        <NextLink href="/dashboard">
          <ListItemButton sx={{ color: "white", textDecoration: "none" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </NextLink>
        <NextLink href="/">
          <ListItemButton sx={{ color: "white", textDecoration: "none" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </NextLink>
        <NextLink href="/login">
          <ListItemButton sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <Accessible />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItemButton>
        </NextLink>
        <NextLink href="/booking">
          <ListItemButton sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <BookOnline />
            </ListItemIcon>
            <ListItemText primary={"Booking"} />
          </ListItemButton>
        </NextLink>
        <NextLink href="/repaired">
          <ListItemButton sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <FeaturedPlayList />
            </ListItemIcon>
            <ListItemText primary={"Repaired"} />
          </ListItemButton>
        </NextLink>
      </List>
      <Divider />
      <List>
        <NextLink href="/repaircenter">
          <ListItemButton sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <HomeRepairService />
            </ListItemIcon>
            <ListItemText primary={"Repair Center"} />
          </ListItemButton>
        </NextLink>
      </List>
    </Box>
  );

  return (
    <Drawer variant="permanent" anchor="left" open>
      {itemsList}
    </Drawer>
  );
};

export default LeftDrawer;
