import React from 'react';
import Head from 'next/head';
import LeftDrawer from '@/components/Drawer';
import { Grid } from '@mui/material';
import Repaired from '@/components/Repaired';


const RepairedHome = () => {
  return (
    <><Head>
          <title> Alfix | Repaired</title>
      </Head>
   
      <Grid Container>
        <Grid item>
          <LeftDrawer />
        </Grid>
        <Grid item sx={{ marginLeft: "280px", mr: 4 }}>
          <Repaired />
        </Grid>
      </Grid>
     
    </>
         
  );
};

export default RepairedHome;