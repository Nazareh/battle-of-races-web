import React from 'react';
import GeneralForm from "../components/generalRegistration/GeneralForm";
import RecruitUnits from "../components/recruitUnits/RecruitUnits";
import './App.css';

function App() {
    const baseUrl = 'http://localhost:8080/api/v1/';
    const generalFormUrl = baseUrl + 'generals';
    const unitsUrl = baseUrl + 'units';
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
            <GeneralForm url={generalFormUrl}
                         onGeneralCreated={updateGeneral}
                         onArmiesCreated={updateArmies}/>
            {/*<Workers/>*/}
            <RecruitUnits url={unitsUrl} general={general} armies={armies}/>
        </div>
    );
}

export default App;
