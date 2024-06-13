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
  import React, { useEffect, useState } from "react";

  import { SERVER_URL } from "@/config";
  import { useRouter } from "next/router";
//   import { useAppContext } from "../AppContext";
  
 
  const BoldTableCell = styled(TableCell)({
    fontWeight: "bold",
    backgroundColor: "#A6ACAF",
  });
  
  const ColoredTableCell = styled(TableCell)({
    backgroundColor: "#f0f0f0",
  });
  
  function Collected() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [pickedUpRecords, setPickedUpRecords] = useState([]);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [collectedBy, setCollectedBy] = useState("");
    const [closedRecord, setClosedRecord] = useState(false);
   
    const router = useRouter();
    const { _id } = router.query; // Get the customer information from query
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log("Fetching data from the server...");
          const response = await fetch(`${SERVER_URL}/picked`, {
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
                const updatedPickedUpRecords = responseData.body.map(
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
                    dateCollected: customer.dateCollected,
                    collectedBy: customer.collectedBy,
  
                    faults: [
                      customer.display !== "N/A" && customer.display !== "N/A"
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
                  })
                );
                setPickedUpRecords(updatedPickedUpRecords);
  
                //Calculate total units picked
                const totalUnits = updatedPickedUpRecords.length;
                setTotalUnitsPicked(totalUnits);
  
                console.log("Total Units Picked:", totalUnits);
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
  
    const handleOpenDialog = (customer) => {
      setSelectedCustomer(customer);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handlePickUp = () => {
      if (collectedBy.trim() === "") {
        //
      } else {
        // Update the selected customer's customerPickup value to "closed Records"
        const updatedCustomer = {
          ...selectedCustomer,
          customerPickUp: "closed Records",
        };
        setSelectedCustomer(updatedCustomer);
        // Open the confirm dialog
        setConfirmDialogOpen(true);
        // Close the dialog
        setOpenDialog(false);
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
  
    return (
      <>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="customer table">
            <TableHead>
              <TableRow>
                <BoldTableCell>Customer Name</BoldTableCell>
                <BoldTableCell>Phone Number</BoldTableCell>
                <BoldTableCell>Phone Make</BoldTableCell>
                <BoldTableCell>Phone Model</BoldTableCell>
                <BoldTableCell>IMEI</BoldTableCell>
                <BoldTableCell>Faults</BoldTableCell>
  
                <BoldTableCell>Comments</BoldTableCell>
                <BoldTableCell>Date Collected</BoldTableCell>
                <BoldTableCell>Picked By</BoldTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pickedUpRecords.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.deviceMake}</TableCell>
                  <TableCell>{customer.phoneModel}</TableCell>
                  <TableCell>{customer.imei}</TableCell>
                  <TableCell>{customer.faults}</TableCell>
                  <TableCell>{customer.repairComments}</TableCell>
                  <TableCell>{customer.dateCollected}</TableCell>
                  <TableCell>{customer.collectedBy}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <BoldTableCell colSpan={9} align="center">
                  Total Units Picked: {}
                </BoldTableCell>
              </TableRow>
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
                  value={selectedCustomer.collectedBy}
                  onChange={(e) => setCollectedBy(e.target.value)}
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
      </>
    );
  }
  export default Collected;
  