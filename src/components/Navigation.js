import React, {useState, useEffect} from "react";
import {navigate} from 'hookrouter';

export default function Navigation({isAuthenticated, logout}) {
    const doNothing = () => {

    }
    const loggedOutNavBarItems = [
        {title: "Home", location: "/", action: doNothing},
        {title: "Register", location: "/register", action: doNothing}

    ]

    const loggedInNavBarItems = [
        {title: "Dashboard", location: "/", action: doNothing},
        {title: "Workers", location: "/workers", action: doNothing},
        {title: "Recruit Units", location: "/recruitunits", action: doNothing},
        {title: "Military Point", location: "/militarypoint", action: doNothing},
        {title: "Logout", location: "/", action: logout}
    ]
    let navBar =[];

        if (!isAuthenticated) {
            navBar = loggedOutNavBarItems;

        } else {
            navBar = loggedInNavBarItems;
        }
        const renderedBar =[];

        navBar.forEach(value =>
            renderedBar.push(
                <div className="flex-grow pa3 flex flex-column items-center">
                    <a onClick={() => {
                        navigate(value.location);
                        value.action();
                    }}
                       className="f6 link dib white fw6 dim mr3 mr4-ns pointer">{value.title}</a>
                </div>)
        );
    return (
        <nav className="flex bg-black-80 shadow-5 justify-end bb b--white-10">
            {renderedBar}
        </nav>
    )
};