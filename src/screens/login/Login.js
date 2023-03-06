import Fetch from "../../util/fetch";
import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

/*
    Login component provides the login functionality to the user
    Created By- Arsalan Ansari
 */

const Login = ({closeModalHandler, user, setUser}) => {
    const [emailWarning, setEmailWarning] = useState("hide");
    const [passwordWarning, setPasswordWarning] = useState("hide");

    const emailWarningHandler = () => {
        setEmailWarning("hide");
    }
    const passwordWarningHandler = () => {
        setPasswordWarning("hide");
    }
    const loginHandler = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let validEmailExpression = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (email === "" && password === "") {
            setPasswordWarning("container-form-helper");
        } else if ((email === "" || validEmailExpression.test(email) === false) && password !== "") {
            setEmailWarning("display");
        } else if (password === "" && email !== "") {
            setEmailWarning("hide");
            setPasswordWarning("container-form-helper")
        } else {
            Fetch({methodName: "LoginUser", email: email, password: password})
                .then(user => handleLogin(user));
        }
    }
    const handleLogin = (user) => {
        if (user !== undefined) {
            setUser(user);
            sessionStorage.setItem("user", JSON.stringify(user));
            setTimeout(closeModalHandler, 1000);
        }
    }

    return (
        <Typography component="div" style={{padding: 0, textAlign: "center"}}>
            <FormControl required>
                <InputLabel>Email</InputLabel>
                <Input id="email" type="text" onChange={emailWarningHandler}/>
                <FormHelperText className={emailWarning}>
                    <span className="validation-message">Enter valid Email</span>
                </FormHelperText>
            </FormControl>
            <br/><br/>
            <FormControl required>
                <InputLabel>Password</InputLabel>
                <Input id="password" type="password" onChange={passwordWarningHandler}/>
            </FormControl>
            <div className={passwordWarning}>
                {
                    <div className="form-helper-text">
                        Please fill out this field.
                    </div>
                }
            </div>
            <br/><br/>
                {
                    user !== null &&
                    <FormControl>
                    <span>
                        Login Successful!
                    </span>
                </FormControl>
                }
            <br/><br/>
            <Button variant="contained" color="primary" onClick={loginHandler}>LOGIN</Button>
            <br/><br/>
        </Typography>
    );
}

export default Login;