import React, {useEffect} from 'react';
import axios from "axios";
import GeneralForm from "../components/GeneralForm";
import RecruitUnits from "../components/RecruitUnits";
import Resources from "../components/Resources"
import Dashboard from "../components/Dashboard";
import './App.css';

function App() {
    const baseUrl = 'http://192.168.20.97:8080/api/v1/';
    const urls = {
        general: baseUrl + 'generals',
        units : baseUrl + 'units',
        generalArmies : baseUrl + 'armies/generals/',
        armyUnits : baseUrl + 'armyunits/'
    };

    const [generalView, setgeneralView] = React.useState(true);
    const [recruitUnitsView, setRecruitUnitsView] = React.useState(false);
    const [general, setGeneral] = React.useState(null);
    const [armies, setArmies] = React.useState(null);
    const [armyUnits, setArmyUnits] = React.useState(null);

    function updateGeneral(generalId) {
        if (generalId !== null ) {
            axios.get(urls.general + '/' + generalId)
                .then(response => {
                    setGeneral(response.data);
                });
        }
    }

    function updateArmyUnits(armies) {
        axios.get(urls.armyUnits + '/' + armies[0])
            .then(response => {
                setArmyUnits(response.data);
            });
    }

    function updateArmies(newValue) {
          setArmies(newValue);
          setRecruitUnitsView(true);
    }

    return (
        <div className="App">
            {/*<Navigation/>*/}
            <Resources general={general}/>

            <GeneralForm visible = {generalView}
                         postGeneralUrl={urls.general}
                         getArmiesUrl={urls.generalArmies}
                         updateGeneral={updateGeneral}
                         updateArmies={updateArmies}/>
            {/*<Workers/>*/}
            <Dashboard armyUnits={armyUnits}
                       unitstUrl={urls.units}
                       general={general}/>

            <RecruitUnits visible = {recruitUnitsView}
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
