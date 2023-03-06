import Fetch from "../../util/fetch";
import React, {useState} from "react";
import {Card, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Rating} from "@material-ui/lab";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

/*
    RateAppointment provides the rating functionality to the appointment
    Created By- Arsalan Ansari
 */

const RateAppointment = ({appointmentId, doctorId, accessToken, closeRateAppointmentModal}) => {
    let hideRatingWarning = {
        display: "none"
    }
    const displayRatingWarning = {
        display: "block"
    }

    const [ratings, setRatings] = useState(0);
    const [ratingWarning, setRatingWarnings] = useState(hideRatingWarning);

    const setRatingsHandler = (ratings) => {
        setRatings(ratings);
        setRatingWarnings(hideRatingWarning);
    }
    const rateAppointmentHandler = () => {
        if (ratings === 0)
            setRatingWarnings(displayRatingWarning);
        else {
            let jsonRequestBody = {
                appointmentId: appointmentId,
                doctorId: doctorId,
                rating: ratings,
                comments: document.getElementById('comments').value
            }
            Fetch({methodName: "RateAppointment", requestBody: jsonRequestBody, accessToken: accessToken})
                .then(textResponse => {
                    if (textResponse !== undefined) {
                        alert("Rating successfully submitted!");
                        closeRateAppointmentModal();
                    }
                })
        }
    }

    return(
        <Card>
            <header style={{
                backgroundColor: "purple",
                height: "35px",
                margin: 0,
                padding: "11px",
                color: "white",
                textAlign: "left"
            }}>
                <p style={{marginTop: "10px"}}>Rate an Appointment</p>
            </header>
            <Typography component={"div"} style={{textAlign: "left", padding: "10px"}}>
                <FormControl>
                    <InputLabel>Comments</InputLabel>
                    <br/><br/><br/>
                    <TextField id="comments" type="text"/>
                </FormControl>
                <br/>
                <FormControl>
                    <span>Rating: <Rating name="ratings" value={ratings} onChange={(event, ratings) => {setRatingsHandler(ratings)}}/></span>
                    <FormHelperText style={ratingWarning}>
                        <span className="validation-message">Select a rating</span>
                    </FormHelperText>
                </FormControl>
                <br/><br/><br/>
                <Button variant="contained" color="primary" onClick={rateAppointmentHandler}>RATE APPOINTMENT</Button>
            </Typography>
        </Card>
    );
}

export default RateAppointment;