import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

function TitleActions() {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          alignItems: "center",
          
        }}
      >
        <Typography variant="h4" color="#873600">
          Admin Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TitleActions;
