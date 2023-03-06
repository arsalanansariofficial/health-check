import "../home/Home.css";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";
import React, {useState} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

/*
    Home component display the landing page of the application
    with the tabs DOCTOR and APPOINTMENT
    Created By- Arsalan Ansari
 */

const Home = ({user}) => {
    const [tabValue, setTabValue] = useState(() => {
        if (user !== null)
            return 1;
        else return 0;
    });

    const tabChangeHandler = () => {
        if (tabValue === 0)
            setTabValue(1);
        else setTabValue(0);
        return tabValue;
    }

    return (
        <div>
            <Tabs variant={"fullWidth"} value={tabValue} onChange={tabChangeHandler}>
                <Tab label="DOCTORS" />
                <Tab label="APPOINTMENT" />
            </Tabs>
            {
                tabValue === 0 &&
                <div className={"text-align-centre"}>
                    <br/>
                    <DoctorList user={user} setTabValue={setTabValue}/>
                </div>
            }
            {
                tabValue === 1 &&
                user === null &&
                <div className={"text-align-centre"}>
                    <br/>
                    Login to see appointments
                </div>
            }

            {
                tabValue === 1 &&
                user !== null &&
                <Appointment user={user}/>
            }
        </div>
    );
}

export default Home;