import Login from "@/components/Login";
import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";

const Home = () => {
  return (
    <>
      <Head>
        <title> Alfix | Home</title>
      </Head>
      <div>
        <Container maxWidth="lg">
          <Login />
        </Container>
      </div>
    </>
  );
};

export default Home;