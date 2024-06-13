import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { SERVER_URL } from "@/config";
import { useRouter } from "next/router";


const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#A6ACAF",
});

const StyledNextLink = styled(NextLink)`
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline with other items */
`;

function Repaired() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pickedBy, setPickedBy] = useState("");
  const [closedRecord, setClosedRecord] = useState(false);
  const [repairedItems, setRepairedItems] = useState([]);
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const { _id } = router.query; // Get the customer information from query

  // const handleOpenDialog = (customer) => {
  //   setSelectedCustomer(customer);
  //   setOpenDialog(true);
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const markAsPickedUp = async () => {
    try {
      // Prepare the data for the API request
      const requestData = {
        customerId: selectedCustomer._id,
        pickedBy: pickedBy,
      };

      // Make a PUT request to the backend API
      const response = await fetch(`${SERVER_URL}/picked?_id=${selectedCustomer._id}&collectedBy=${pickedBy}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
    
      // Check the response status
      if (response.status === 200) {
        // Successfully marked as picked up, handle the UI or state changes accordingly
        setConfirmDialogOpen(true);
      } else {
        // Handle errors here
        console.error("Error marking as picked up:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error marking as picked up:", error);
    }
  };

  const handlePickUp = () => {
    if (pickedBy.trim() === "") {
      //
    } else {
      // // Update the selected customer's customerPickup value to "closed Records"
      // const updatedCustomer = {
      //   ...selectedCustomer,
      //   customerPickUp: "closed Records",
      // };
      // setSelectedCustomer(updatedCustomer);
      // // Open the confirm dialog
      // setConfirmDialogOpen(true);
      // Close the dialog
      setOpenDialog(false);
      markAsPickedUp();
    }
  };

  const handleCloseConfirmDialog = (confirmed) => {
    // Close the confirmation dialog
    setConfirmDialogOpen(false);
    //set the closedRecord state true
    if (confirmed) {
      // Set the closedRecord state true and open the success dialog
      setClosedRecord(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from the server...");
        const response = await fetch(`${SERVER_URL}/repaired`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Server response status:", response.status);

        if (response.status === 200) {
          const responseData = await response.json();
          console.log("Response data from the server:", responseData);

          if (Array.isArray(responseData.body)) {
            if (responseData.body.length > 0) {
              const updatedRepairedItems = responseData.body.map(
                (customer) => ({
                  id: customer.id,
                  customerName: `${customer.firstName} ${customer.middleName} ${customer.lastName}`,
                  phoneNumber: customer.phoneNumber,

                  deviceMake: customer.deviceMake,
                  phoneModel: customer.model,
                  model: customer.model,
                  imei: customer.imei,
                  repairComments: customer.repairComments,
                  sparePartUsed: customer.sparePartUsed,
                  _id: customer._id,

                  faults: [
                    customer.display !== "N/A" && customer.diplay !== "N/A"
                      ? customer.display
                      : null,
                    customer.sound !== "No" && customer.sound !== "N/A"
                      ? customer.sound
                      : null,
                    customer.power !== "No" && customer.power !== "N/A"
                      ? customer.power
                      : null,
                    customer.software !== "No" && customer.software !== "N/A"
                      ? customer.software
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" "),

                  duration: calculateDuration(customer.createdAt),
                })
              );
              setRepairedItems(updatedRepairedItems);
            } else {
              console.log("No data received from the server");
            }
          } else {
            console.error(
              "Data from the server is not an array:",
              responseData.body
            );
          }
        } else {
          console.error("Server error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const calculateDuration = (createdAt) => {
    const currentDate = new Date();
    const differenceInDays = Math.floor(
      (currentDate - new Date(createdAt)) / (1000 * 60 * 60 * 24)
    );
    return `${differenceInDays} days`;
  };

  const handleOpenPickupDialog = (customer) => {
    // Implement the logic to open the dialog and set the selected customer
    const updatedCustomer = {
      ...customer,
      id: customer.id,
    };
    setSelectedCustomer(updatedCustomer);
    setOpenDialog(true);
  };

  return (
    <>
    <Grid container>
        <Grid item sx={{ ml: "30%", color: "#873600", mt: 8}}>
          <Typography variant="h4">Ready for Collection</Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="customer table">
          <TableHead>
            <TableRow>
              <BoldTableCell>Id</BoldTableCell>
              <BoldTableCell>Customer Name</BoldTableCell>
              <BoldTableCell>Phone Number</BoldTableCell>
              <BoldTableCell>Phone Make</BoldTableCell>
              <BoldTableCell>Phone Model</BoldTableCell>
              <BoldTableCell>IMEI</BoldTableCell>
              <BoldTableCell>Faults</BoldTableCell>

              <BoldTableCell>Comments</BoldTableCell>
              <BoldTableCell>Spare Used</BoldTableCell>
              <BoldTableCell>Customer PickUp</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairedItems.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer._id}</TableCell>
                <TableCell>{customer.customerName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.deviceMake}</TableCell>
                <TableCell>{customer.phoneModel}</TableCell>
                <TableCell>{customer.imei}</TableCell>
                <TableCell>{customer.faults}</TableCell>

                <TableCell>{customer.repairComments}</TableCell>
                <TableCell>{customer.sparePartUsed}</TableCell>
                <TableCell>
                  <StyledNextLink
                    href={{
                      pathname: "create pick-up",
                    }}
                    passHref
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenPickupDialog(customer);
                    }}
                  >
                    Create Pick-up
                  </StyledNextLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Customer Pick-up Details</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <>
              <TextField
                label="Customer Name"
                value={selectedCustomer.customerName}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Make"
                value={selectedCustomer.deviceMake}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Number"
                value={selectedCustomer.phoneNumber}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Make"
                value={selectedCustomer.deviceMake}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Model"
                value={selectedCustomer.phoneModel}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="IMEI"
                value={selectedCustomer.imei}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Comments"
                value={selectedCustomer.comments}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Picked By"
                fullWidth
                style={{ marginTop: 12 }}
                value={pickedBy}
                onChange={(e) => setPickedBy(e.target.value)}
                required // Add this attribute to make it required
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              textTransform: "none",
              borderRadius: 5,
              backgroundColor: "red",
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handlePickUp}
            color="primary"
            sx={{ textTransform: "none", borderRadius: 5 }}
          >
            Mark as Picked Up
          </Button>
        </DialogActions>
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogContent>
          <Box style={{ textAlign: "center" }}>
            <ErrorIcon style={{ color: "red", fontSize: 60 }} />
          </Box>
          <Typography>Are you sure you want to close this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Button
                variant="contained"
                onClick={() => handleCloseConfirmDialog(false)}
                sx={{
                  textTransform: "none",
                  borderRadius: 5,
                  backgroundColor: "red",
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Button
                variant="contained"
                onClick={() => handleCloseConfirmDialog(true)}
                color="primary"
                sx={{ textTransform: "none", borderRadius: 5 }}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Success Dialog */}
      {closedRecord && (
        <Dialog open={closedRecord} onClose={() => setClosedRecord(false)}>
          <DialogContent>
            <Box style={{ textAlign: "center" }}>
              <CheckCircleIcon style={{ color: "#6200ea", fontSize: 60 }} />
            </Box>
            <Typography>You have successfully closed the record.</Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => setClosedRecord(false)}
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: 5,
                color: "white",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
export default Repaired;
