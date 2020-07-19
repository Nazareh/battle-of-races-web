import React, {useState, useEffect} from "react";
import {navigate} from 'hookrouter';

export default function Navigation({isAuthenticated, logout,general,updateWar,updateGeneral,
                                       updateArmies,updateIncomingArmies,updateOpponents,updateCombatLogs}) {
    const doNothing = () => {

    }

    const refreshCommonData = () => {
        if (!!general){
            updateWar();
            updateGeneral(general.id);
            updateArmies(general.id);
        }
    }
    const refreshDashboard = () => {
        if (!!general){
            refreshCommonData();
            updateIncomingArmies(general.id);
        }
    }

    const refreshOpponents = () => {
        if (!!general){
            refreshCommonData();
            updateOpponents(general.id);
        }
    }

    const refreshCombatLogs = () => {
        if (!!general){
            refreshCommonData();
            updateCombatLogs(general.id);
        }
    }

    const loggedOutNavBarItems = [
        {title: "Home", location: "/", action: doNothing},
        {title: "Register", location: "/register", action: doNothing}

    ]

    const loggedInNavBarItems = [
        {title: "Dashboard", location: "/main", action: refreshDashboard},
        {title: "Workers", location: "/workers", action: refreshCommonData},
        {title: "Recruit Units", location: "/recruitunits", action: refreshCommonData},
        {title: "Military Point", location: "/militarypoint", action: refreshOpponents},
        {title: "Combat Logs", location: "/combatlogs", action: refreshCombatLogs},
        {title: "Research", location: "/research", action: doNothing},
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
                       className="f6 link dib fw6 dim mr3 mr4-ns pointer">{value.title}</a>
                </div>)
        );
    return (
        <nav className="flex bg-black-80 shadow-5 justify-end bb b--white-10">
            {renderedBar}
        </nav>
    )
};