import React, {useEffect, useState} from 'react';
import './App.css';
import {useRoutes,navigate} from 'hookrouter';
import axios from "axios";
import Register from "../components/Register";
import Home from "../components/Home";
import Main from "../components/Main";
import {urls} from '../components/urls';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [general,setGeneral] = useState(null);
    const [existingUser,setExistingUser] = useState(false);

    const login = (username) => {
        axios.get(urls.getGeneralByName + username.username)
            .then( res => {
                    if(!!res.data) {
                        setGeneral(res.data);
                        setIsAuthenticated(true);
                        navigate("/main")
                    }
                    else {
                        alert('Username does not exist');
                    };
                }
            )
    }
    const logout = () => {
        setIsAuthenticated(false);
        setGeneral(null);
        setExistingUser(false);
        navigate("/");
    }
    const registerNewUser = (newUser) => {
        axios.post(urls.postNewGeneral,newUser)
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                if (error.response.status === 409){
                    setExistingUser(true);
                }
            })
    }

    const updateGeneral = (generalId) => {
        axios.get(urls.getGeneralById + generalId)
            .then(res => {
                    setGeneral(res.data);
                }
            );
    };
    const Routes = {
        "/": () => <Home isAuthenticated={isAuthenticated}
                         login={login}
                         logout={logout}/>,
        "/main": () => <Main isAuthenticated={isAuthenticated}
                             logout={logout}
                             general={general}
                             updateGeneral={updateGeneral}
        />,
        "/register": () => <Register registerNewUser={registerNewUser}
                                     existingUser={existingUser}/>,
    };
    const routeResult = useRoutes(Routes)

    return routeResult;
}