import Fetch from "../../util/fetch";
import RateAppointment from "./RateAppointment";
import React, {useEffect, useState} from "react";
import {Paper} from "@material-ui/core";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";

/*
    Appointment component displays all the appointments of
    the user with the specific doctor
    Created By- Arsalan Ansari
 */

const Appointment = ({user}) => {
    const appointmentsListTemplate = (appointmentDetails, index) => {
        return (
            <Paper key={index} style={{textAlign: "left", margin: "15px", padding: "20px"}}>
                <span>Dr: {appointmentDetails.doctorName}</span>
                <br/><br/>
                <span>Date: {appointmentDetails.appointmentDate}</span>
                <br/>
                <span>Symptoms: {appointmentDetails.symptoms}</span>
                <br/>
                <span>priorMedicalHistory: {appointmentDetails.priorMedicalHistory}</span>
                <br/><br/><br/>
                <Button variant={"contained"} color={"primary"} onClick={() => {openRateAppointmentModal(appointmentDetails)}}>RATE APPOINTMENT</Button>
            </Paper>
        );
    }
    const rateAppointmentStyle = {
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

    const [appointmentsList, setAppointmentsList] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [rateAppointmentModal, setRateAppointmentModal] = useState(false);

    useEffect(() => {
        Fetch({methodName: "GetAppointmentsList", userId: user.id, accessToken: user.accessToken})
            .then(appointmentsList => {
                if (appointmentsList !== undefined) {
                    if (appointmentsList.length > 0) {
                        setAppointmentsList(appointmentsList);
                    }
                }
            });
    }, [user]);
    const closeRateAppointmentModal = () => {
        setRateAppointmentModal(false);
    }
    const openRateAppointmentModal = (appointmentDetails) => {
        setRateAppointmentModal(true);
        appointmentRatingHandler(appointmentDetails);
    }
    const appointmentRatingHandler = (appointmentDetails) => {
        setAppointment(appointmentDetails);
    }

    return(
        <div>
            {
                appointmentsList !== null &&
                appointmentsList.map((appointmentDetails, index) => {
                    return appointmentsListTemplate(appointmentDetails, index);
                })
            }
            {
                appointmentsList === null &&
                <div className={"text-align-centre"}>
                    <br/>
                    No Appointments!
                </div>
            }
            <Modal
                ariaHideApp={false}
                isOpen={rateAppointmentModal}
                contentLabel="RateAppointmentModal"
                onRequestClose={closeRateAppointmentModal}
                style={rateAppointmentStyle}
            >
                {
                    appointment !== null &&
                    <RateAppointment
                        appointmentId={appointment.appointmentId}
                        doctorId={appointment.doctorId}
                        accessToken={user.accessToken}
                        closeRateAppointmentModal={closeRateAppointmentModal}
                    />
                }
            </Modal>
        </div>
    )
}

export default Appointment;