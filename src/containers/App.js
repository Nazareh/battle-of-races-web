import React from 'react';
import GeneralForm from "../components/generalRegistration/GeneralForm";
import RecruitUnits from "../components/recruitUnits/RecruitUnits";
import Resources from "../components/resources/Resources"
import './App.css';

function App() {
    const baseUrl = 'http://192.168.20.97:8080/api/v1/';
    const urls = {
        postGeneral: baseUrl + 'generals',
        getRaceUnits : baseUrl + 'units',
        getArmies : baseUrl + 'armies/generals/',
        postArmyUnits : baseUrl + 'armyunits/'
    };


    const [RecruitUnitsView, setRecruitUnitsView] = React.useState(false)
    const [general, setGeneral] = React.useState(null);
    const [armies, setArmies] = React.useState(null);

    function updateGeneral(newValue) {
        setGeneral(newValue);
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
                         postGeneralUrl={urls.postGeneral}
                         getArmiesUrl={urls.getArmies}
                         onGeneralCreated={updateGeneral}
                         onArmiesCreated={updateArmies}/>
            {/*<Workers/>*/}

            <RecruitUnits visible = {true}
                          getRaceUnitsUrl={urls.getRaceUnits}
                          postArmyUnitsUrl={urls.postArmyUnits}
                          general={general}
                          armies={armies}/>

        </div>
    );
}

export default App;
