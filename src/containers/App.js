import React from 'react';
import GeneralForm from "../components/generalRegistration/GeneralForm";
import RecruitUnits from "../components/recruitUnits/RecruitUnits";
import './App.css';

function App() {
    const baseUrl = 'http://localhost:8080/api/v1/';
    const urls = {
        postGeneral: baseUrl + 'generals',
        getRaceUnits : baseUrl + 'units',
        getArmies : baseUrl + 'armies/generals/',
        postArmyUnits : baseUrl + 'armyunits/'
    };
    const [general, setGeneral] = React.useState(null);
    const [armies, setArmies] = React.useState(null);

    function updateGeneral(newValue) {
        setGeneral(newValue);
    }

    function updateArmies(newValue) {
          setArmies(newValue);
    }

    return (
        <div className="App">
            {/*<Navigation/>*/}
            {/*<Resources/>*/}
            <GeneralForm postGeneralUrl={urls.postGeneral}
                         getArmiesUrl={urls.getArmies}
                         onGeneralCreated={updateGeneral}
                         onArmiesCreated={updateArmies}/>
            {/*<Workers/>*/}

            <RecruitUnits getRaceUnitsUrl={urls.getRaceUnits}
                          postArmyUnitsUrl={urls.postArmyUnits}
                          general={general}
                          armies={armies}/>

        </div>
    );
}

export default App;
