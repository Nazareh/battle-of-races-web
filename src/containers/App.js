import React, {useEffect, useState} from 'react';
import axios from "axios";
import GeneralForm from "../components/GeneralForm";
import RecruitUnits from "../components/RecruitUnits";
import Resources from "../components/Resources"
import Dashboard from "../components/Dashboard";
import Login from "../components/login/Login";
import MilitaryPoint from "../components/militaryPoint/MilitaryPoint";
import './App.css';
import {useGoogleLogin} from "react-google-login";

function App() {
    const baseUrl = 'http://nazareh-d9571034.localhost.run/api/v1/';
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
        setIsAuthenticated(response.authenticated)
        setUserEmail(response.email);
        updateGeneralByEmail(response.email)
        setArmyUnits(null);
    };

    useEffect(() => {
    }, [userEmail, isAuthenticated]);

    async function updateGeneral(generalId) {
        if (generalId !== null) {
            const generalResponse = await axios.get(urls.general + '/' + generalId);
            setGeneral(generalResponse.data);

            const armiesResponse = await axios.get(urls.generalArmies + generalId);

            setArmies(armiesResponse.data);

            updateArmyUnits(armiesResponse.data.map(army => army.id));
        }
    }

    async function updateGeneralByEmail(userEmail) {
        if (userEmail !== null) {
            const generalResponse = await axios.get(urls.general + '/email/' + userEmail);
            setGeneral(generalResponse.data);

            const armiesResponse = await axios.get(urls.generalArmies + generalResponse.data.id);

            setArmies(armiesResponse.data);

            updateArmyUnits(armiesResponse.data.map(army => army.id));
        }
    }

     function updateArmyUnits(armies) {
        axios.get(urls.armyUnits +armies[0])
            .then(async response => {
                setArmyUnits(response.data);
            });
    }

    async function updateArmies(newValue) {
        setArmies(newValue);
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
                <MilitaryPoint isAuthenticated={isAuthenticated} />
            </div>
    );
}

export default App;
