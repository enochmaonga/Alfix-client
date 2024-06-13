import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: 50,
  paddingBottom: 10,
  [theme.breakpoints.down("md")]: {
    paddingTop: 30,
  },
}));

// eslint-disable-next-line react/display-name
const PageContainer = React.forwardRef(({ maxWidth = "lg", ...rest }, ref) => (
  <StyledContainer maxWidth={maxWidth} {...rest} ref={ref} />
));

export default PageContainer;
