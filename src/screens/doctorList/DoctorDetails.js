import React from "react";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Rating} from "@material-ui/lab";

/*
    DoctorDetails component displays the details of the selected doctor
    this component doesn't require user to be logged in
    Created By- Arsalan Ansari
 */

const DoctorDetails = ({firstName, lastName, totalYearsOfExp, speciality, dob, city, emailId, mobile, rating}) => {
    return (
        <Card>
            <header style={{
                backgroundColor: "purple",
                height: "35px",
                margin: 0,
                padding: "11px",
                color: "white",
                textAlign: "left"
            }}>
                <p style={{marginTop: "10px"}}>Doctor Details</p>
            </header>
            <Typography style={{textAlign: "left", padding: "10px"}}>
                <span>Dr: {firstName} {lastName}</span>
                <br/><br/>
                <span>Total Experience: {totalYearsOfExp}</span>
                <br/>
                <span>Speciality: {speciality}</span>
                <br/>
                <span>Date of Birth: {dob}</span>
                <br/>
                <span>City: {city}</span>
                <br/>
                <span>Email: {emailId}</span>
                <br/>
                <span>Mobile: {mobile}</span>
                <br/>
                <span>Rating: <Rating value={rating} readOnly={true}/></span>
            </Typography>
        </Card>
    );
}

export default DoctorDetails;