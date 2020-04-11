import React from 'react';
import GeneralForm from "../components/generalRegistration/GeneralForm";
import RecruitUnits from "../components/recruitUnits/RecruitUnits";
import './App.css';

function App() {
    const baseUrl = 'http://localhost:8080/api/v1/';
    const generalFormUrl = baseUrl + 'generals';
    const unitsUrl = baseUrl + 'units';
    const [general, setGeneral] = React.useState(null);

    function updateGeneral(newValue) {
        setGeneral(newValue);
    }

    return (
        <div className="App">
            {/*<Navigaviton/>*/}
            {/*<Resources/>*/}
            <GeneralForm url={generalFormUrl} onFinish={updateGeneral}/>
            {/*<Workers/>*/}
            <RecruitUnits url={unitsUrl} general={general}/>
        </div>
    );
}

export default App;
