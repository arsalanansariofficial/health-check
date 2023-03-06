import Fetch from "../../util/fetch";
import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

/*
    Register components enables user to be Registered into the application
    Created By- Arsalan Ansari
 */

const Register = ({closeModalHandler, user, setUser}) => {
    const [firstNameWarning, setFirstNameWarning] = useState("hide");
    const [lastNameWarning, setLastNameWarning] = useState("hide");
    const [emailWarning, setEmailWarning] = useState("hide");
    const [passwordWarning, setPasswordWarning] = useState("hide");
    const [mobileNumberWarning, setMobileNumberWarning] = useState("hide");
    
    const firstNameWarningHandler = () => {
        setFirstNameWarning("hide");
    }
    const lastNameWarningHandler = () => {
        setLastNameWarning("hide");
    }
    const emailWarningHandler = () => {
        setEmailWarning("hide");
    }
    const passwordWarningHandler = () => {
        setPasswordWarning("hide");
    }
    const mobileNumberWarningHandler = () => {
        setMobileNumberWarning("hide");
    }
    const registrationHandler = () => {
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let mobileNumber = document.getElementById('mobileNumber').value;
        let validEmailExpression = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        let validMobileNumber = /^[0-9]{10}$/;
        if (firstName === "" && lastName === "" && email === "" && password === "" && mobileNumber === "") {
            setFirstNameWarning("container-form-helper");
        } else if (firstName === "" || firstName.length < 3) {
            setFirstNameWarning("container-form-helper");
        } else if (lastName === "" || lastName.length < 3) {
            setLastNameWarning("display");
        } else if (email === "" || validEmailExpression.test(email) === false) {
            setEmailWarning("display");
        } else if (password === "" || password.length < 8) {
            setPasswordWarning("display");
        } else if (mobileNumber === "" || validMobileNumber.test(mobileNumber) === false) {
            setMobileNumberWarning("display");
        } else {
            let jsonRequestBody = {
                emailId: email,
                firstName: firstName,
                lastName: lastName,
                mobile: mobileNumber,
                password: password
            }
            Fetch({methodName: "RegisterUser", requestBody: jsonRequestBody})
                .then(newUser => handleRegistration(newUser));
        }
    }
    const handleRegistration = (newUser) => {
        if (newUser !== undefined) {
            setUser(newUser);
            sessionStorage.setItem("user", JSON.stringify(newUser));
            setTimeout(closeModalHandler, 1000);
        }
    }
    
    return(
        <Typography component="div" style={{padding: 0, textAlign: "center"}}>
            <FormControl required>
                <InputLabel>First Name</InputLabel>
                <Input id="firstName" type="text" onChange={(firstName) => {firstNameWarningHandler(firstName)}}/>
            </FormControl>
            <div className={firstNameWarning}>
                {
                    <div className="form-helper-text">
                        Please fill out this field.
                    </div>
                }
            </div>
            <br/><br/>
            <FormControl required>
                <InputLabel>Last Name</InputLabel>
                <Input id="lastName" type="text" onChange={lastNameWarningHandler}/>
                <FormHelperText className={lastNameWarning}>
                    <span className="validation-message">Enter last name</span>
                </FormHelperText>
            </FormControl>
            <br/><br/>
            <FormControl required>
                <InputLabel>Email Id</InputLabel>
                <Input id="email" type="text" onChange={emailWarningHandler}/>
                <FormHelperText className={emailWarning}>
                    <span className="validation-message">Enter valid Email</span>
                </FormHelperText>
            </FormControl>
            <br/><br/>
            <FormControl required>
                <InputLabel>Password</InputLabel>
                <Input id="password" type="password" onChange={passwordWarningHandler}/>
                <FormHelperText className={passwordWarning}>
                    <span className="validation-message">Enter valid password</span>
                </FormHelperText>
            </FormControl>
            <br/><br/>
            <FormControl required>
                <InputLabel>Mobile No.</InputLabel>
                <Input id="mobileNumber" type="text" onChange={mobileNumberWarningHandler}/>
                <FormHelperText className={mobileNumberWarning}>
                    <span className="validation-message">Enter valid mobile number</span>
                </FormHelperText>
            </FormControl>
            <br/><br/>
                {
                    user !== null &&
                    <FormControl>
                        <span className="successText">
                            Registration Successful!
                        </span>
                    </FormControl>
                }
            <br/><br/>
            <Button variant="contained" color="primary" onClick={registrationHandler}>Register</Button>
            <br/><br/>
        </Typography>
    );
}

export default Register;