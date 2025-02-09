import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Card,
  styled,
  TextField,
  InputAdornment,
  Grid,
  Button,
  TablePagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CreateUserDialog from "./CreateUserDialog";
import { SERVER_URL } from "@/config";
import DeleteUserDialog from "./DeleteUser";


const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "sky#A6ACAF",
});

function Users() {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [users, setUsers] = useState([]); // Change the state name to "users" to avoid confusion

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);


const [currentPage, setCurrentPage] = useState(0); // Track the current page
const usersPerPage = 5; // Number of users to display per page
 

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleRegisterUser = async (formData) => {
    try {
      const response = await fetch(`${SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // User registration was successful, you can update the UI as needed.
        const result = await response.json();
        console.log(result.success); 
  
        // This will log the success message from the server.
      } else {
        // Handle registration error, e.g., show an error message to the user.
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleDeleteUser = () => {
   
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          const responseData = await response.json();
          
          if (Array.isArray(responseData.body)) {
            if (responseData.body.length > 0) {
              setUsers(responseData.body);
            } else {
              console.log("No data received from the server");
            }
           
          } else {
            console.error("Data from the server is not an array:", responseData.body);
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
  console.log("OBJECT:", users);

 const handleConfirmDelete = async () => {
  try {
    // Send a request to delete the user using the selectedUserId
    const response = await fetch(`${SERVER_URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {

      console.log("User deleted successfully");
      // Refresh the user list or update the UI here
    } else {
      console.error("User deletion failed");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const handleCloseDeleteDialog = () => {
  setDeleteDialogOpen(false); 
};

const handlePageChange = (event, newPage) => {
  setCurrentPage(newPage);
};

// Calculate the index range for the users to display on the current page
const startIndex = currentPage * usersPerPage;
const endIndex = startIndex + usersPerPage;
  
  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "left",
          mb:4,
          color: "#A6ACAF",
        }}
      >
        Users
      </Typography>
      <Grid container >
        <Grid item xs={12} sm={6} md={8} xl={10}>
          <TextField
            id="search-bar"
            className="text"
            label="search by username"
            variant="outlined"
            placeholder="Enter userName"
            sx={{ minWidth: "90%" }}
            // onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ fill: "#A6ACAF" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, mt: 1, backgroundColor: "#A6ACAF" }}
            onClick={handleOpenCreateDialog}
          
          >
            Create User
          </Button>
          <CreateUserDialog
            open={isCreateDialogOpen}
            onClose={handleCloseCreateDialog}
            onSave={handleRegisterUser}
          />
        </Grid>
      </Grid>
      <Card sx={{ width: "100%", mt: 3 }}>
        <Table>
          <TableHead style={{ backgroundColor: "#A6ACAF"}}>
            <TableRow>
            <BoldTableCell>id</BoldTableCell>
              <BoldTableCell>Name</BoldTableCell>
              <BoldTableCell>User Name</BoldTableCell>
              <BoldTableCell>Phone</BoldTableCell>
              <BoldTableCell>Email</BoldTableCell>
              <BoldTableCell>User Type</BoldTableCell>
              <BoldTableCell>Action</BoldTableCell>
            </TableRow>
          </TableHead>
              <TableBody>
                {Array.isArray(users) ? (
              users.slice(startIndex, endIndex).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
                ) : (
                  [1,2,3,4,5].map((index))
                )}
            </TableBody>
        </Table>
        <Box sx={{display: "flex", alignContent: "center", justifyContent: "center"}}>
        <TablePagination
          component="div"
          count={users.length}
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={usersPerPage}
          rowsPerPageOptions={[]}
         
        />
        </Box>
      </Card>

      <DeleteUserDialog
      open={isDeleteDialogOpen}
      onClose={handleCloseDeleteDialog}
      onDelete={handleConfirmDelete} // Pass the delete function
    />
    </Container>
  );
}

export default Users;
