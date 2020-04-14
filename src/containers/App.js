import React from 'react';
import axios from "axios";
import GeneralForm from "../components/generalRegistration/GeneralForm";
import RecruitUnits from "../components/recruitUnits/RecruitUnits";
import Resources from "../components/resources/Resources"
import './App.css';

function App() {
    const baseUrl = 'http://192.168.20.97:8080/api/v1/';
    const urls = {
        general: baseUrl + 'generals',
        units : baseUrl + 'units',
        generalArmies : baseUrl + 'armies/generals/',
        armyUnits : baseUrl + 'armyunits/'
    };


    const [RecruitUnitsView, setRecruitUnitsView] = React.useState(false)
    const [general, setGeneral] = React.useState(null);
    const [armies, setArmies] = React.useState(null);

    function updateGeneral(generalId) {
        axios.get(urls.general + '/' + generalId)
            .then(response => {
                setGeneral(response.data);
                console.log(response.data);
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

            <GeneralForm visible = {true}
                         postGeneralUrl={urls.general}
                         getArmiesUrl={urls.generalArmies}
                         onGeneralCreated={updateGeneral}
                         onArmiesCreated={updateArmies}/>
            {/*<Workers/>*/}

            <RecruitUnits visible = {false}
                          getRaceUnitsUrl={urls.units}
                          postArmyUnitsUrl={urls.armyUnits}
                          general={general}
                          armies={armies}
                          onArmiesChanged={updateGeneral}/>

        </div>
    );
}

export default App;
