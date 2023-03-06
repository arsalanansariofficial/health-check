import Header from "../common/header/Header";
import Home from "../screens/home/Home";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React, {useState} from 'react';

/*
    Controller components groups all the components together
    that are to be displayed as a single piece of application
    Created By- Arsalan Ansari
 */

const Controller = () => {
    const [user, setUser] = useState(() => {
        if (sessionStorage.getItem("user") === null)
            return null;
        else return JSON.parse(sessionStorage.getItem("user"));
    });

    const home = () => {
        return(<Home user={user}/>)
    }

    return (
        <BrowserRouter>
            <div>
                <Header user={user} setUser={setUser}/>
                <Switch>
                    <Route exact path="/" component={home}/>
                    <Route exact path="/home" component={home}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Controller;