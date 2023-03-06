import Fetch from "../../util/fetch";
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import React, {useState} from "react";
import {Card, Select, MenuItem, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

/*
    BookAppointment component allows user to book an appointment
    only when the user is logged in
    Created By- Arsalan Ansari
 */

const BookAppointment = ({doctorId, doctorName, user, setTabValue, closeBookAppointmentModal}) => {
    const currentDate = new Date();
    const currentDateString = new Date().toISOString().substring(0, currentDate.toISOString().indexOf("T"));
    const hideWarning = {
        display: "none"
    }
    const displayWarning = {
        display: "block"
    }
    const hideExample = {
        display: "none"
    }
    const displayExample = {
        display: "block"
    }

    const [date, setDate] = useState(currentDateString);
    const [timeSlots] = useState([
        "None",
        "10AM-11AM",
        "11AM-12AM",
        "12AM-01PM",
        "05PM-06PM",
        "06PM-07PM",
        "07PM-08PM",
        "08PM-09PM"
    ]);
    const [timeSlot, setTimeSlot] = useState("None");
    const [timeSlotWarning, setTimeSlotWarning] = useState(hideWarning);
    const [exampleSymptoms, setExampleSymptoms] = useState(hideExample);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const TimeSlotHandler = (newTimeSlot) => {
        setTimeSlot(newTimeSlot);
        if (newTimeSlot !== "None")
            setTimeSlotWarning(hideWarning);
    }
    const dateChangeHandler = (newDate) => {
        setDate(newDate);
    }
    const displayExampleHandler = () => {
        setExampleSymptoms(displayExample);
    }
    const openDialogHandler = () => {
        setIsDialogOpen(true);
    };
    const closeDialogHandler = () => {
        setIsDialogOpen(false);
    };
    const bookAppointmentHandler = () => {
        if (user === null) {
            alert("Please Login to Book an Appointment!");
            closeBookAppointmentModal();
        }
        else if (timeSlot === "None")
            setTimeSlotWarning(displayWarning);
        else {
            let jsonRequestBody = {
                doctorId: doctorId,
                doctorName: doctorName,
                userId: user.id,
                userName: user.firstName + " " + user.lastName,
                userEmailId: user["emailAddress"],
                timeSlot: timeSlot,
                status: "appointment-confirmed",
                appointmentDate: date,
                createdDate: currentDateString,
                symptoms: document.getElementById('symptoms').value,
                priorMedicalHistory: document.getElementById('medicalHistory').value
            }
            Fetch({methodName: "BookAppointment", requestBody: jsonRequestBody, accessToken: user.accessToken})
                .then(textResponse => {
                    if (textResponse !== undefined) {
                        alert("Appointment Confirmed!");
                        closeBookAppointmentModal();
                        setTabValue(1);
                    }
                    else openDialogHandler();
                })
        }
    }

    return (
        <Card style={{zoom: "75%"}}>
            <header style={{
                backgroundColor: "purple",
                height: "35px",
                margin: 0,
                padding: "11px",
                color: "white",
                textAlign: "left"
            }}>
                <p style={{marginTop: "10px"}}>Book an Appointment</p>
            </header>
            <Typography component={"div"} style={{textAlign: "left", padding: "10px"}}>
                <FormControl required>
                    <InputLabel htmlFor="doctorName">DoctorName</InputLabel>
                    <br/><br/>
                    <TextField id="doctorName" type="text" value={doctorName}/>
                </FormControl>
                <br/>
                <FormControl required>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-dd-MM"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={date}
                            minDate={currentDateString}
                            onChange={dateChangeHandler}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
                <br/>
                <FormControl required>
                    <span>Timeslot</span>
                    <Select id="timeSlot" defaultValue={"None"}
                            onChange={(event) => TimeSlotHandler(event.target.value)}>
                        {
                            timeSlots.map((timeSlot, i) => {
                                return (<MenuItem key={i} value={timeSlot}>{timeSlot}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText style={timeSlotWarning}>
                        <span className="validation-message">Select a time slot</span>
                    </FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="medicalHistory">Medical History</InputLabel>
                    <br/><br/><br/>
                    <TextField id="medicalHistory" type="text"/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="symptoms">Symptoms</InputLabel>
                    <br/>
                    <br/><span style={exampleSymptoms}>ex: Cold, Swelling, etc</span>
                    <br/>
                    <TextField id="symptoms" type="text" onChange={displayExampleHandler}/>
                </FormControl>
                <br/><br/>
                <Button variant="contained" color="primary" onClick={bookAppointmentHandler}>BOOK APPOINTMENT</Button>
            </Typography>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialogHandler}
            >
                <DialogTitle style={{backgroundColor: "black", color: "white"}}>
                    &#127760; localhost:3000
                </DialogTitle>
                <DialogContent style={{backgroundColor: "black"}}>
                    <DialogContentText style={{backgroundColor: "black", color: "white"}}>
                        Either the slot is already booked or not available
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{backgroundColor: "black", color: "white"}}>
                    <Button variant={"contained"} color={"primary"} onClick={closeDialogHandler}>OK</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default BookAppointment;