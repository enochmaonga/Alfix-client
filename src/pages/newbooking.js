import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { SERVER_URL } from "@/config";
import { useRouter } from "next/router";
// import { responseMessage } from "../apollo/ReactiveVariables";
import SummaryTable from "@/components/SummaryTable";

const validationSchema = Yup.object({
  // Define validation rules for your form fields
  firstName: Yup.string().required("required"),
  middleName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  phoneNumber: Yup.string()
    .required("required")
    .min(10, "phone number must be at least 10 digits"),
  email: Yup.string().required("required"),
  otherPhoneNumber: Yup.string()
    .required("required")
    .min(10, "phone number must be at least 10 digits"),
  imei: Yup.string().required("required"),
  deviceMake: Yup.string().required("required"),
  model: Yup.string().required("required"),
  dateOfPurchase: Yup.string().required("required"),
  placeOfPurchase: Yup.string().required("required"),
  warrantyStatus: Yup.string().required("required"),
  display: Yup.string().required("required"),
  power: Yup.string().required("required"),
  sound: Yup.string().required("required"),
  software: Yup.string().required("required"),
  other: Yup.string().required("required"),
  additionalInformation: Yup.string().required("required"),
});

const steps = ["Customer Details", "Phone Details", "Fault Details", "Summary"];

const display = [
  "Cracked Screen",
  "No Display",
  "Displays Lines",
  "Inverted Display",
  "Touch not working",
  "Other",
  "N/A",
];
const power = [
  "Does not Power",
  "Does not charge",
  "Short Battery life",
  "Swollen Battery",
  "Charging port not working",
  "Other",
  "N/A",
];
const sound = [
  "No sound",
  "Cracking sound",
  "Works only on loudspeaker",
  "mic not working",
  "Low volume",
  "Other",
  "N/A",
];
const software = ["Goes on and off", "Needs software update", "Other", "N/A"];

const Newbooking = () => {
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const formik = useFormik({
    initialValues: {
      //   itemName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      const serverResponse = "Form submitted successfully";
      setServerResponse(serverResponse);
      handleDialogOpen();
    },
  });

  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({});

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateFormValues = (values) => {
    setFormValues({ ...formValues, ...values });
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setDialogTitle("Success!");
    setDialogContent("You have successully booked this item", serverResponse);
  };
  ////
  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/customer");
  };
  ////

  const handleNewBooking = (allFormValues) => {
    // Send a POST request to the server
    fetch(`${SERVER_URL}/newbooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allFormValues),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("server response:", data);

        //handle success
        handleDialogOpen();

        // Navigate
        // router.push("/customer");
      })

      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setServerResponse("Failed to Submit the form", responseMessage);
        handleDialogOpen();
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allFormValues = { ...formik.values, ...formValues };
      await handleNewBooking(allFormValues);
      // const response = handleNewBooking(allFormValues);
    } catch (error) {
      console.error("error Submitting form", error);
    } finally {
      setLoading(false);
    }
    // console.log("Submitted:", formik.values);
  };

  return (
    <>
      <Typography
        variant="h5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Phone Booking Form
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6} sx={{ mt: 5 }}>
            <Stepper activeStep={currentStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        <Card sx={{ minHeight: "50vh", borderRadius: 5, mt: 5 }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{ display: index === currentStep ? "block" : "none" }}
            >
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "-10px",
                  padding: "10px",
                }}
              >
                {step}
              </Typography>

              {index === 0 && (
                <>
                  <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="middleName"
                        name="middleName"
                        label="Middle Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.middleName}
                        error={
                          formik.touched.middleName &&
                          Boolean(formik.errors.middleName)
                        }
                        helperText={
                          formik.touched.middleName && formik.errors.middleName
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        helperText={
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="otherPhoneNumber"
                        name="otherPhoneNumber"
                        label="Other Phone Number"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.otherPhoneNumber}
                        error={
                          formik.touched.otherPhoneNumber &&
                          Boolean(formik.errors.otherPhoneNumber)
                        }
                        helperText={
                          formik.touched.otherPhoneNumber &&
                          formik.errors.otherPhoneNumber
                        }
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {index === 1 && (
                <>
                  <Grid container spacing={2} sx={{ padding: 5 }}>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="imei"
                        name="imei"
                        label="IMEI"
                        type="number"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.imei}
                        error={
                          formik.touched.imei && Boolean(formik.errors.imei)
                        }
                        helperText={formik.touched.imei && formik.errors.imei}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="deviceMake"
                        name="deviceMake"
                        label="Device Make"
                        type="text"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.deviceMake}
                        error={
                          formik.touched.deviceMake &&
                          Boolean(formik.errors.deviceMake)
                        }
                        helperText={
                          formik.touched.deviceMake && formik.errors.deviceMake
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="model"
                        name="model"
                        label="Model"
                        type="text"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.model}
                        error={
                          formik.touched.model && Boolean(formik.errors.model)
                        }
                        helperText={formik.touched.model && formik.errors.model}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="dateOfPurchase"
                        name="dateOfPurchase"
                        label="Date Of Purchase"
                        type="date"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dateOfPurchase}
                        error={
                          formik.touched.dateOfPurchase &&
                          Boolean(formik.errors.dateOfPurchase)
                        }
                        helperText={
                          formik.touched.dateOfPurchase &&
                          formik.errors.dateOfPurchase
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="placeOfPurchase"
                        name="placeOfPurchase"
                        label="Place Of Purchase"
                        type="text"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.placeOfPurchase}
                        error={
                          formik.touched.placeOfPurchase &&
                          Boolean(formik.errors.placeOfPurchase)
                        }
                        helperText={
                          formik.touched.placeOfPurchase &&
                          formik.errors.placeOfPurchase
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="warrantyStatus"
                        name="warrantyStatus"
                        label="Warranty Status"
                        type="text"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.warrantyStatus}
                        error={
                          formik.touched.warrantyStatus &&
                          Boolean(formik.errors.warrantyStatus)
                        }
                        helperText={
                          formik.touched.warrantyStatus &&
                          formik.errors.warrantyStatus
                        }
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {index === 2 && (
                <>
                  <Grid container spacing={2} sx={{ padding: 5 }}>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="display-label">Display</InputLabel>
                        <Select
                          labelId="display-label"
                          id="display"
                          name="display"
                          label="Display"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.display}
                          error={
                            formik.touched.display &&
                            Boolean(formik.errors.display)
                          }
                        >
                          {display.map((display) => (
                            <MenuItem key={display} value={display}>
                              {display}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="power-label">Power</InputLabel>
                        <Select
                          labelId="power-label"
                          id="power"
                          name="power"
                          label="Power"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.power}
                          error={
                            formik.touched.power && Boolean(formik.errors.power)
                          }
                        >
                          {power.map((power) => (
                            <MenuItem key={power} value={power}>
                              {power}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="sound-label">Sound</InputLabel>
                        <Select
                          labelId="sound-label"
                          id="sound"
                          name="sound"
                          label="Sound"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.sound}
                          error={
                            formik.touched.sound && Boolean(formik.errors.sound)
                          }
                        >
                          {sound.map((sound) => (
                            <MenuItem key={sound} value={sound}>
                              {sound}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="software-label">Software</InputLabel>
                        <Select
                          labelId="software-label"
                          id="software"
                          name="software"
                          label="software"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.software}
                          error={
                            formik.touched.software &&
                            Boolean(formik.errors.software)
                          }
                        >
                          {software.map((software) => (
                            <MenuItem key={software} value={software}>
                              {software}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="other"
                        name="other"
                        label="Other"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.other}
                        error={
                          formik.touched.other && Boolean(formik.errors.other)
                        }
                        helperText={formik.touched.other && formik.errors.other}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        id="additionalInformation"
                        name="additionalInformation"
                        label="Additional Informtion"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.additionalInformation}
                        error={
                          formik.touched.additionalInformation &&
                          Boolean(formik.errors.additionalInformation)
                        }
                        helperText={
                          formik.touched.additionalInformation &&
                          formik.errors.additionalInformation
                        }
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {index === 3 && (
                <>
                  <Grid
                    container
                    spacing={1}
                    justifyItems="center"
                    justifyContent="center"
                    sx={{ mt: 5, mb: 5 }}
                  >
                    <Grid item xs={6}>
                      <SummaryTable formValues={formValues} />
                    </Grid>
                  </Grid>
                </>
              )}

              <Grid
                container
                spacing={2}
                justifyItems="center"
                justifyContent="center"
                sx={{ mb: 5 }}
              >
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="contained"
                      fullWidth
                      sx={{ ml: 18, backgroundColor: "#A6ACAF" }}
                    >
                      Previous
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  {index < steps.length - 1 && (
                    <Button
                      onClick={() => {
                        nextStep();
                        updateFormValues(formik.values);
                      }}
                      variant="contained"
                      fullWidth
                      sx={{ ml: 20, backgroundColor: "#A6ACAF"  }}
                    >
                      Next
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                  {index === steps.length - 1 && (
                    <>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                          <Button
                            type="button"
                            // onClick={handlePrint}
                            variant="outlined"
                            color="primary"
                            style={{color:"#A6ACAF"}}
                            fullWidth
                            

                          >
                            Print
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth
                            disabled={loading}
                            sx={{ backgroundColor: "#A6ACAF"  }}
                          >
                          {loading ? "Submitting..." : "Submit"}
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </div>
          ))}
        </Card>
      </form>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", alignContent: "center" }}
        >
          <Button
            onClick={handleDialogClose}
            autoFocus
            variant="contained"
            style={{ borderRadius: 20 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Newbooking;
