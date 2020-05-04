import React, {useEffect, useState} from 'react';
import './App.css';
import {useRoutes, navigate} from 'hookrouter';
import axios from "axios";
import Register from "../components/Register";
import Main from "../components/Main";
import {urls} from '../components/urls';
import Particles from "react-particles-js";
import Navigation from "../components/Navigation";
import Login from "../components/Login";
import Resources from "../components/Resources";
import Dashboard from "../components/Dashboard";
import Workers from "../components/Workers";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [existingUser, setExistingUser] = useState(false);
    const [general, setGeneral] = useState(null);
    const [armies, setArmies] = useState({});
    const [armyUnits, setArmyUnits] = useState(null);
    const [war, setWar] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    const logout = () => {
        setIsAuthenticated(false);
        setGeneral(null);
        setExistingUser(false);
        navigate("/");
    }

    const particlesOptions =
        {
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


    const login =  (username) => {
        axios.get(urls.getGeneralByName + username.username)
            .then(res => {
                    if (!!res.data) {
                        setIsAuthenticated(true);
                        setLoading(true);
                        updateGeneral(res.data.id);
                        updateWar();

                        navigate("/main")
                    } else {
                        alert('Username does not exist');
                    }
                    ;
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
        await axios.get(urls.getGeneralById + generalId )
                .then(res => setGeneral(res.data));
    };

    const updateWar = async () => {
        await  axios.get(urls.getWar)
            .then(res => setWar(res.data));
    };
    const updateArmies = () => {
        axios.get(urls.getWar)
            .then(res => setWar(res.data));
    };

    const Routes = {
        "/": () =>
            <div>
                <Navigation isAuthenticated={isAuthenticated} logout={logout}/>
                <Particles className="particles" params={particlesOptions}/>
                <Login login={login}/>
            </div>,
        "/main": () =>
            <div>
                <Navigation isAuthenticated={isAuthenticated} logout={logout}/>
                <Resources general={general} war={war}/>
                {/*<Particles className="particles" params={particlesOptions}/>*/}
                <Main general={general}
                      war={war}
                      logout={logout}/>
            </div>,
        "/register": () =>
            <div>
                <Navigation isAuthenticated={isAuthenticated} logout={logout}/>
                <Particles className="particles" params={particlesOptions}/>
                <Register registerNewUser={registerNewUser}
                          existingUser={existingUser}/>
            </div>,
        "/workers": () =>
            <div>
                <Navigation isAuthenticated={isAuthenticated} logout={logout}/>
                <Resources general={general} war={war}/>
                {/*<Particles className="particles" params={particlesOptions}/>*/}
                <Workers general={general}
                         updateGeneral={updateGeneral}
                         logout={logout}
                />
            </div>
    };

    const routeResult = useRoutes(Routes)

    return routeResult;
}