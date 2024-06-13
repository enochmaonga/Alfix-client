import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const SummaryTable = ({ formValues }) => {
  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>Field</strong>
          </TableCell>
          <TableCell>
            <strong>Value</strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <strong>First Name:</strong>
          </TableCell>
          <TableCell>{formValues.firstName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Middle Name:</strong>
          </TableCell>
          <TableCell>{formValues.middleName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Last Name:</strong>
          </TableCell>
          <TableCell>{formValues.lastName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Phone Number:</strong>
          </TableCell>
          <TableCell>{formValues.phoneNumber}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Email:</strong>
          </TableCell>
          <TableCell>{formValues.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Other Phone Number:</strong>
          </TableCell>
          <TableCell>
            {formValues.otherPhoneNumber}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>IMEI:</strong>
          </TableCell>
          <TableCell>{formValues.imei}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Device Make:</strong>
          </TableCell>
          <TableCell>{formValues.deviceMake}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Device Model:</strong>
          </TableCell>
          <TableCell>{formValues.model}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Date of Purchase:</strong>
          </TableCell>
          <TableCell>{formValues.dateOfPurchase}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Place of Purchase:</strong>
          </TableCell>
          <TableCell>
            {formValues.placeOfPurchase}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Warranty Status:</strong>
          </TableCell>
          <TableCell>{formValues.warrantyStatus}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Display:</strong>
          </TableCell>
          <TableCell>{formValues.display}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Power:</strong>
          </TableCell>
          <TableCell>{formValues.power}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Sound:</strong>
          </TableCell>
          <TableCell>{formValues.sound}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Software:</strong>
          </TableCell>
          <TableCell>{formValues.software}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Other:</strong>
          </TableCell>
          <TableCell>{formValues.other}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Additional Information:</strong>
          </TableCell>
          <TableCell>
            {formValues.additionalInformation}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default SummaryTable;