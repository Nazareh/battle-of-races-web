import React, {useEffect, useState} from 'react';
import './App.css';
import {navigate, useRoutes} from 'hookrouter';
import axios from "axios";
import Register from "../components/Register";
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
import CombatLogs from "../components/CombatLogs";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [existingUser, setExistingUser] = useState(false);
    const [general, setGeneral] = useState(null);
    const [armies, setArmies] = useState([]);
    const [armyUnits, setArmyUnits] = useState(null);
    const [war, setWar] = useState({});
    const [opponents,setOpponents] = useState([]);
    const [incomingArmies,setIncomingArmies]= useState([]);
    const [combatLogs,setCombatLogs] = useState([])
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

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
        setCombatLogs([]);
        if (!!general) {
            console.log(general.name);
            axios.post(urls.logout + general.name)
        }
        navigate("/");
    }

    const login = (credentials) => {
        axios.post(urls.login,credentials)
            .then(res => {
                    if (!!res.data) {
                        setToken(res.data);
                        axios.get(urls.getGeneralByName + credentials.username)
                            .then(res => {
                                setIsAuthenticated(true);
                                setLoading(true);
                                updateGeneral(res.data.id);
                                updateWar();
                                updateArmies(res.data.id);
                                updateOpponents(res.data.id);
                                updateIncomingArmies(res.data.id);
                                updateCombatLogs(res.data.id);
                                navigate("/main")
                            })
                            .catch(err => console.log(err))
                    } else {
                        alert('Username does not exist');
                    }
                }
            )
            .catch(err => console.log(err));
    }

    const registerNewUser = (newUser) => {
        console.log(newUser);
        axios.post(urls.register, newUser)
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

    const updateCombatLogs = (generalId) => {
        axios.get(urls.getCombatLogsByGeneral + generalId)
            .then(res => setCombatLogs(res.data));
    };

    const navBar =  <Navigation isAuthenticated={isAuthenticated}
                                logout={logout}
                                general={general}
                                updateWar={updateWar}
                                updateGeneral={updateGeneral}
                                updateArmies={updateArmies}
                                updateIncomingArmies={updateIncomingArmies}
                                updateOpponents={updateOpponents}
                                updateCombatLogs={updateCombatLogs}
    />;
    const particles = <Particles className="particles" params={particlesOptions}/>;
    const resources = <Resources general={general} war={war}/>;

   const tempUnits =
       [
           {
               "id": 1,
               "race": "HUMAN",
               "category": "FRL",
               "name": "Guerreiro",
               "tgt1": "FRL",
               "tgt2": "ART",
               "tgt3": null,
               "initiative": 20,
               "attack": 9,
               "defense": 13,
               "strikes": 1,
               "life": 0,
               "gold": 40,
               "wood": 15,
               "food": 15,
               "speed": 0
           },
       {
           "id": 2,
           "race": "HUMAN",
           "category": "FRL",
           "name": "Lanceiro",
           "tgt1": "CAV",
           "tgt2": "FRL",
           "tgt3": "INF",
           "initiative": 17,
           "attack": 12,
           "defense": 9,
           "strikes": 1,
           "life": 0,
           "gold": 5,
           "wood": 40,
           "food": 50,
           "speed": 0
       }]

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
                <div className="flex justify-around">
                    <MyUnits general={general}
                             myUnits={armyUnits}
                             logout={logout}
                    />
                    <ArmyStatus armies={armies}
                                incomingArmies={incomingArmies}
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
                <RecruitUnits units={tempUnits}
                              recruitUnits={updateArmyUnits}
                              resources={general}
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
            </div>,
        "/combatlogs": () =>
            <div>
                {navBar}
                {resources}
                <CombatLogs combatLogs={combatLogs}
                            logout={logout}/>
            </div>

    };

    return useRoutes(Routes);
}