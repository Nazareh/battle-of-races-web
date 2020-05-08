import React, {useEffect, useState} from 'react';
import './App.css';
import {navigate, useRoutes} from 'hookrouter';
import axios from "axios";
import Register from "../components/Register";
import Main from "../components/Main";
import {urls} from '../components/urls';
import Particles from "react-particles-js";
import Navigation from "../components/Navigation";
import Login from "../components/Login";
import Resources from "../components/Resources";
import Workers from "../components/Workers";
import RecruitUnits from "../components/RecruitUnits";
import MilitaryPoint from "../components/MilitaryPoint/MilitaryPoint";
import MyUnits from "../components/MyUnits";
import ArmyStatus from "../components/ArmyStatus";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [existingUser, setExistingUser] = useState(false);
    const [general, setGeneral] = useState(null);
    const [armies, setArmies] = useState([]);
    const [armyUnits, setArmyUnits] = useState(null);
    const [war, setWar] = useState({});
    const [opponents,setOpponents] = useState([]);
    const [incomingArmies,setIncomingArmies]= useState([]);


    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //
    // }, []);

    const particlesOptions = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            }
        }
    }
    const logout = () => {
        setIsAuthenticated(false);
        setWar(null);
        setGeneral(null);
        setExistingUser(false);
        setArmies([]);
        setArmyUnits(null);
        setOpponents([]);
        setIncomingArmies([]);
        setLoading(false);

        navigate("/");
    }


    const login = (username) => {
        axios.get(urls.getGeneralByName + username.username)
            .then(res => {
                    if (!!res.data) {
                        setIsAuthenticated(true);
                        setLoading(true);
                        updateGeneral(res.data.id);
                        updateWar();
                        updateArmies(res.data.id);
                        updateOpponents(res.data.id);
                        updateIncomingArmies(res.data.id);

                        navigate("/main")
                    } else {
                        alert('Username does not exist');
                    }
                }
            )
    }

    const registerNewUser = (newUser) => {
        axios.post(urls.postNewGeneral, newUser)
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                if (error.response.status === 409) {
                    setExistingUser(true);
                }
            })
    }

    const updateGeneral = async (generalId) => {
        await axios.get(urls.getGeneralById + generalId)
            .then(res => setGeneral(res.data));
    };

    const updateWar = async () => {
        await axios.get(urls.getWar)
            .then(res => setWar(res.data));
    };

    const updateArmies = (generalId) => {
        axios.get(urls.getArmiesByGeneral + generalId)
            .then(res => {
                setArmies(res.data);
                updateArmyUnits(res.data);
            });
    }

    const updateArmyUnits = (armies) => {
        axios.get(urls.getArmyUnitsByArmy + armies[0].id)
            .then(res => {
                setArmyUnits(res.data);
            });
    };

    const updateOpponents = (generalId) => {
        axios.get(urls.getOpponentes + generalId)
            .then(res => setOpponents(res.data));
    };

    const updateIncomingArmies = (generalId) => {
        axios.get(urls.getIncomingArmies + generalId)
            .then(res => setIncomingArmies(res.data));
    };

    const navBar =  <Navigation isAuthenticated={isAuthenticated}
                                logout={logout}
                                general={general}
                                updateWar={updateWar}
                                updateGeneral={updateGeneral}
                                updateArmies={updateArmies}
                                updateIncomingArmies={updateIncomingArmies}
                                updateOpponents={updateOpponents}
    />;
    const particles = <Particles className="particles" params={particlesOptions}/>;
    const resources = <Resources general={general} war={war}/>;

    const Routes = {
        "/": () =>
            <div>
                {navBar}
                {particles}
                <Login login={login}/>
            </div>,
        "/main": () =>
            <div>
                {navBar}
                {resources}
                <div className="flex flex-wrap">
                    <ArmyStatus armies={armies}
                                incomingArmies={incomingArmies}
                    />
                    <MyUnits general={general}
                             myUnits={armyUnits}
                             logout={logout}
                    />
                </div>
            </div>,
        "/register": () =>
            <div>
                {navBar}
                {particles}
                <Register registerNewUser={registerNewUser}
                          existingUser={existingUser}/>
            </div>,
        "/workers": () =>
            <div>
                {navBar}
                {resources}
                <Workers general={general}
                         updateGeneral={updateGeneral}
                         logout={logout}
                />
            </div>,
        "/recruitunits": () =>
            <div>
                {navBar}
                {resources}
                <RecruitUnits general={general}
                              updateGeneral={updateGeneral}
                              armies={armies}
                              updateArmyUnits={updateArmyUnits}
                              logout={logout}
                />
            </div>,
        "/militarypoint": () =>
            <div>
                {navBar}
                {resources}
                <MilitaryPoint general={general}
                               armies={armies}
                               logout={logout}
                               opponents={opponents}
                />
            </div>

    };

    return useRoutes(Routes);
}