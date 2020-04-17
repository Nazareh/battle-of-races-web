import React, {useEffect, useState} from 'react';
import axios from "axios";
import GeneralForm from "../components/GeneralForm";
import RecruitUnits from "../components/RecruitUnits";
import Resources from "../components/Resources"
import Dashboard from "../components/Dashboard";
import Login from "../components/login/Login";
import './App.css';
import {useGoogleLogin} from "react-google-login";

function App() {
    const baseUrl = 'http://192.168.20.97:8080/api/v1/';
    const urls = {
        general: baseUrl + 'generals',
        units: baseUrl + 'units',
        generalArmies: baseUrl + 'armies/generals/',
        armyUnits: baseUrl + 'armyunits/'
    };
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [general, setGeneral] = useState(null);
    const [armies, setArmies] = useState(null);
    const [armyUnits, setArmyUnits] = useState(null);


    function logout() {
        setIsAuthenticated(false);
        setUserEmail(null);
        setGeneral(null);
        setArmies(null);
        setArmyUnits(null);
    };

    const login = async (response) => {
        await setIsAuthenticated(response.authenticated)
        await setUserEmail(response.email);
        await updateGeneralByEmail(response.email)
        await setArmyUnits(null);
    };

    useEffect(() => {
    }, [userEmail, isAuthenticated]);

    async function updateGeneral(generalId) {
        if (generalId !== null) {
            const generalResponse = await axios.get(urls.general + '/' + generalId);
            await setGeneral(generalResponse.data);

            const armiesResponse = await axios.get(urls.generalArmies + generalId);

            await setArmies(armiesResponse.data);

            updateArmyUnits(armiesResponse.data.map(army => army.id));
        }
    }

    async function updateGeneralByEmail(userEmail) {
        if (userEmail !== null) {
            const generalResponse = await axios.get(urls.general + '/email/' + userEmail);
            await setGeneral(generalResponse.data);

            const armiesResponse = await axios.get(urls.generalArmies + generalResponse.data.id);

            await setArmies(armiesResponse.data);

            updateArmyUnits(armiesResponse.data.map(army => army.id));
        }
    }

    function updateArmyUnits(armies) {
        axios.get(urls.armyUnits + armies[0])
            .then(response => {
                setArmyUnits(response.data);
            });
    }

    async function updateArmies(newValue) {
        await setArmies(newValue);
    }

    return (
        !!isAuthenticated && !general ?
            <div>
                <Login
                    isAuthenticated={isAuthenticated}
                    login={login}
                    logout={logout}
                />
                <GeneralForm general={general}
                             postGeneralUrl={urls.general}
                             getArmiesUrl={urls.generalArmies}
                             updateGeneral={updateGeneral}
                             updateArmies={updateArmies}
                             userEmail={userEmail}
                />
            </div>
            :
            <div className="App">
                {/*<Navigation/>*/}
                <Login
                    isAuthenticated={isAuthenticated}
                    login={login}
                    logout={logout}
                />
                <p>{userEmail}</p>
                <Resources isAuthenticated={isAuthenticated}
                           general={general}/>
                {/*<Workers/>*/}
                <Dashboard isAuthenticated={isAuthenticated}
                           armyUnits={armyUnits}
                           unitstUrl={urls.units}
                           general={general}/>

                <RecruitUnits isAuthenticated={isAuthenticated}
                              getRaceUnitsUrl={urls.units}
                              postArmyUnitsUrl={urls.armyUnits}
                              general={general}
                              armies={armies}
                              updateGeneral={updateGeneral}
                              updateArmyUnits={updateArmyUnits}/>

            </div>
    );
}

export default App;
