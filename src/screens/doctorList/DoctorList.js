import Fetch from "../../util/fetch";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import Typography from "@material-ui/core/Typography";
import {Paper, Select, MenuItem} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import {Rating} from "@material-ui/lab";
import Button from "@material-ui/core/Button";

/*
    DoctorList components displays list of doctors available
    with the selected filter applied, this component doesn't
    require user to be logged in
    Created By- Arsalan Ansari
 */

const DoctorList = ({user, setTabValue}) => {
    const doctorDetailsStyle = {
        content: {
            width: "25%",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0
        }
    };
    const bookAppointmentStyle = {
        content: {
            width: "60%",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0
        }
    };
    const doctorListTemplate = (doctorDetails, index) => {
        return (
            <div key={index}>
                <Paper style={{textAlign: "left", padding: "20px"}}>
                    <Typography>
                        <span>Doctor Name: {doctorDetails.firstName} {doctorDetails.lastName}</span>
                        <br/><br/>
                        <span>Speciality: {doctorDetails.speciality}</span>
                        <br/>
                        <span>Rating: <Rating value={parseInt(doctorDetails.rating)} readOnly={true}/></span>
                        <br/>
                        <Button className={"appointment-button"} variant={"contained"} color={"primary"}
                                style={{margin: "10px"}} onClick={() => {openBookAppointmentModal(doctorDetails)}}>BOOK
                            APPOINTMENT</Button>
                        <Button className={"view-details-button"} variant={"contained"}
                                style={{width: "40%", margin: "10px", backgroundColor: "green"}} onClick={() => {
                            openDoctorDetailsModal(doctorDetails)
                        }}>VIEW
                            DETAILS</Button>
                    </Typography>
                </Paper>
                <br/>
            </div>
        )
    }

    const [filters] = useState(["CARDIOLOGIST", "GENERAL_PHYSICIAN", "DENTIST", "PULMONOLOGIST", "ENT", "GASTRO"]);
    const [filter, setFilter] = useState("GENERAL_PHYSICIAN");
    const [doctorsList, setDoctorsList] = useState(undefined);
    const [doctor, setDoctor] = useState(null)
    const [doctorDetailsModal, setDoctorDetailsModal] = useState(false);
    const [bookAppointmentModal, setBookAppointmentModal] = useState(false);

    useEffect(() => {
        Fetch({methodName: "GetDoctorsList", filter: filter})
            .then(doctorsList => {
                if (doctorsList !== undefined)
                    setDoctorsList(doctorsList);
            })
    }, [filter])
    const setDoctorDetails = (data) => {
        setDoctor(data);
    }
    const openBookAppointmentModal = (data) => {
        setBookAppointmentModal(true);
        setDoctorDetails(data);
    }
    const closeBookAppointmentModal = () => {
        setBookAppointmentModal(false)
    }
    const openDoctorDetailsModal = (data) => {
        setDoctorDetailsModal(true);
        setDoctorDetails(data);
    }
    const closeDoctorDetailsModal = () => {
        setDoctorDetailsModal(false)
    }

    return (
        <div style={{width: "40%", marginLeft: "auto", marginRight: "auto"}}>
            <InputLabel htmlFor="filter">Select Speciality:</InputLabel>
            <Select id="filter" defaultValue={"GENERAL_PHYSICIAN"} onChange={(event) => setFilter(event.target.value)}>
                {
                    filters.map((filter, i) => {
                        return (<MenuItem key={i} value={filter}>{filter.replace("_", " ")}</MenuItem>
                        )
                    })
                }
            </Select>
            {
                doctorsList !== undefined &&
                doctorsList.map((response, index) => {
                    return doctorListTemplate(response, index);
                })
            }
            <Modal
                ariaHideApp={false}
                isOpen={bookAppointmentModal}
                contentLabel="BookAppointmentModal"
                onRequestClose={closeBookAppointmentModal}
                style={bookAppointmentStyle}
            >
                {
                    doctor !== null &&
                    <BookAppointment
                        doctorId={doctor.id}
                        doctorName={doctor.firstName + " " + doctor.lastName}
                        user={user}
                        setTabValue={setTabValue}
                        closeBookAppointmentModal={closeBookAppointmentModal}
                    />
                }
            </Modal>
            <Modal
                ariaHideApp={false}
                isOpen={doctorDetailsModal}
                contentLabel="Login"
                onRequestClose={closeDoctorDetailsModal}
                style={doctorDetailsStyle}
            >
                {
                    doctor !== null &&
                    <DoctorDetails
                        firstName={doctor.firstName}
                        lastName={doctor.lastName}
                        totalYearsOfExp={doctor.totalYearsOfExp}
                        speciality={doctor.speciality}
                        dob={doctor.dob}
                        city={doctor.address.city}
                        emailId={doctor.emailId}
                        mobile={doctor.mobile}
                        rating={doctor.rating}
                    />
                }
            </Modal>
        </div>
    );
}

export default DoctorList;