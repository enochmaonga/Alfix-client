import React from 'react';
import Head from 'next/head';
import LeftDrawer from '@/components/Drawer';
import { Grid } from '@mui/material';
import Repaircenter from '@/components/RepairedList';


const HomePage = () => {
  return (
    <><Head>
          <title> Alfix | Repair Center</title>
      </Head>
   
      <Grid Container>
        <Grid item>
          <LeftDrawer />
        </Grid>
        <Grid item sx={{ marginLeft: "280px", mr: 4 }}>
          <Repaircenter />
        </Grid>
      </Grid>
     
    </>
         
  );
};

export default HomePage;