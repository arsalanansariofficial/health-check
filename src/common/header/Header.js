import logo from '../../assets/logo.jpeg';
import './Header.css';
import Fetch from "../../util/fetch";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import React, {useState} from 'react';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

/*
    This is the Header component of the application
    Created By- Arsalan Ansari
 */

const Header = ({user, setUser}) => {
    const ModalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: 0,
            transform: 'translate(-50%, -50%)'
        }
    };
    const [authenticationModal, setAuthenticationModal] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const tabChangeHandler = () => {
        if (tabValue === 0)
            setTabValue(1);
        else setTabValue(0);
        return tabValue;
    }
    const closeModalHandler = () => {
        setAuthenticationModal(false);
    }
    const loginClickHandler = () => {
        setAuthenticationModal(true);
    }
    const logoutClickHandler = () => {
        Fetch({methodName: "LogoutUser", accessToken: user.accessToken})
            .then(textResponse => {
                if (textResponse !== undefined) {
                    setTimeout(() => {
                        setUser(null);
                        sessionStorage.clear();
                    }, 1000);
                }
            })
    }

    return (
        <div data-testid="app-header">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="App Logo"/>
                <span className={"title-text"}>
                        Doctor Finder
                </span>
                {
                    user === null ?
                        <div className="login-button">
                            <Button variant="contained" color="primary" onClick={loginClickHandler}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="secondary" onClick={logoutClickHandler}>
                                Logout
                            </Button>
                        </div>
                }
            </header>
            <Modal ariaHideApp={false} isOpen={authenticationModal} onRequestClose={closeModalHandler} style={ModalStyle}>
                <header style={{backgroundColor: "purple", height: "35px", margin: 0, padding: "11px", color: "white", textAlign: "left"}}>
                    <p style={{marginTop: "10px"}}>Authentication</p>
                </header>
                <Tabs className="tabs" value={tabValue} onChange={tabChangeHandler}>
                    <Tab label="Login"/>
                    <Tab label="Register"/>
                </Tabs>
                    {
                        tabValue === 0 &&
                        <Login closeModalHandler={closeModalHandler} user={user} setUser={setUser}/>
                    }
                    {
                        tabValue === 1 &&
                        <Register closeModalHandler={closeModalHandler} user={user} setUser={setUser}/>
                    }
            </Modal>
        </div>
    );
}

export default Header;