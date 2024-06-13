import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

// eslint-disable-next-line react/display-name
const BoxLabel = React.forwardRef(
  (
    {
      bgColor = "rgba(67, 176, 42, 0.2)",
      borderRadius = 24,
      padding = "4px 12px",
      color = "#14ae5c",
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          padding,
          color,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

BoxLabel.propTypes = {
  bgColor: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
};

export default BoxLabel;
