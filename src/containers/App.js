import React from 'react';
import GeneralForm from "../components/generalRegistration/GeneralForm";
import RecruitUnits from "../components/recruitUnits/RecruitUnits";
import './App.css';

function App() {
    const baseUrl = 'http://localhost:8080/api/v1/';
    const urls = {
        postGeneral: baseUrl + 'generals',
        getRaceUnits : baseUrl + 'units',
        getArmies : baseUrl + 'armies/generals/'
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

            <RecruitUnits url={urls.getRaceUnits}
                          general={general}
                          armies={armies}/>

            {/*<RecruitUnits url={urls.getRaceUnits} general={armies.general.id} armies={armies}/>*/}
        </div>
    );
}

export default App;
