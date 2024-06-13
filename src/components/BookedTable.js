import React from "react";
import { SERVER_URL } from "@/config";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";


const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#A6ACAF",
});

// const ColoredTableCell = styled(TableCell)({
//   backgroundColor: "#f0f0f0",
// });

const StyledNextLink = styled(NextLink)`
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline with other items */
  
`;

function BookedTable() {
  // const [repairComments, setRepairComments] = useState({});
  const [bookeditems, setBookeditems] = useState([]);

  
  // const handleRepairCommentsChange = (imei, comments) => {
  //   setRepairComments((prevComments) => ({
  //     ...prevComments,
  //     [imei]: comments,
  //   }));
  // };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from the server...");
        const response = await fetch(`${SERVER_URL}/booked`, {
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
              const updatedBookedItems = responseData.body.map((customer) => ({
                id: customer.id,
                _id: customer._id,
                customerName: `${customer.firstName} ${customer.middleName} ${customer.lastName}`,
                phoneNumber: customer.phoneNumber,
                otherPhoneNumber: customer.otherPhoneNumber,
                deviceMake: customer.deviceMake,
                phoneModel: customer.model,
                model: customer.model,
                imei: customer.imei,

               faults: [
                customer.display !== "N/A" && customer.diplay !== "N/A" ? customer.display : null,
                customer.sound !== "No" && customer.sound !== "N/A" ? customer.sound : null,
                customer.power !== "No" && customer.power !== "N/A" ? customer.power : null,
                customer.software !== "No" && customer.software !== "N/A" ? customer.software : null,
              ].filter(Boolean).join(" "),

                duration: calculateDuration(customer.createdAt),
              }));
              setBookeditems(updatedBookedItems);
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


  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="customer table">
          <TableHead>
            <TableRow>
            <BoldTableCell>Booking Id</BoldTableCell>
              <BoldTableCell>Customer Name</BoldTableCell>
              <BoldTableCell>Phone Number</BoldTableCell>
              <BoldTableCell>Phone Make</BoldTableCell>
              <BoldTableCell>Phone Model</BoldTableCell>
              <BoldTableCell>IMEI</BoldTableCell>
              <BoldTableCell>Faults</BoldTableCell>
              <BoldTableCell>Duration</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookeditems.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                <StyledNextLink
                    href={{
                      pathname: "/service-form",
                      query: { _id: customer._id, ...customer },
                    }}
                    passHref
                  >
                    {customer._id}
                  </StyledNextLink>
                  </TableCell>
                <TableCell>{customer.customerName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.deviceMake}</TableCell>
                <TableCell>{customer.model}</TableCell>
                <TableCell>{customer.imei}</TableCell>
                <TableCell>{customer.faults}</TableCell>
                <TableCell>{customer.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default BookedTable;
