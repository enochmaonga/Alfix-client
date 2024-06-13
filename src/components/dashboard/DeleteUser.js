import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { PropTypes } from "@mui/material";

function DeleteUserDialog({ open, onClose, onDelete }) {
  const [deletionStatus, setDeletionStatus] = useState(null);

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      // Deletion was successful
      setDeletionStatus("success");
    } catch (error) {
      // Deletion failed
      setDeletionStatus("failure");
    }
  };

  const handleClose = () => {
    setDeletionStatus(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        {deletionStatus === "success" ? (
          "User has been deleted successfully."
        ) : deletionStatus === "failure" ? (
          "Deletion failed. Please try again."
        ) : (
          "Are you sure you want to delete this user?"
        )}
      </DialogContent>
      <DialogActions>
        {deletionStatus === "success" || deletionStatus === "failure" ? (
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        ) : (
          <>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

DeleteUserDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired, 
//   onDelete: PropTypes.func.isRequired
}

export default DeleteUserDialog;