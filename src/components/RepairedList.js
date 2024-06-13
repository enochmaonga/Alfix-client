import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { PropTypes } from "prop-types";
import BookedTable from "./BookedTable";
import RepairedTable from "./RepairedTable";
import Collected from "./Collected";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node, // Add children prop validation
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function Repaircenter() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Grid container>
        <Grid item sx={{ ml: "36.5%", mt: 4, mb: 2,  color: "#873600"}}>
          <Typography variant="h4">Service Management</Typography>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label="Booked" style={{ color: selectedTab === 0 ? '#873600' : '#873600' }}/>
            <Tab label="Repaired" style={{ color: selectedTab === 0 ? '#873600' : '#873600' }}/>
            <Tab label="Customer Pickup" style={{ color: selectedTab === 0 ? '#873600' : '#873600' }}/>
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            {/* Display Booked Phones */}
            <BookedTable />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            {/* Display Repaired Phones */}
            <RepairedTable />
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            {/* Display Collected Phones */}
            <Collected />
          </TabPanel>
        </CardContent>
      </Card>
    </>
  );
}

Repaircenter.propTypes = {
  bookings: PropTypes.array.isRequired,
};

export default Repaircenter;
