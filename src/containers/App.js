import React from 'react';
import GeneralForm from "../components/generalRegistration/GeneralForm";
import './App.css';

function App() {
    const baseUrl = 'http://localhost:8080/api/v1/';
    const generalFormUrl = baseUrl + 'generals';
    const [generalId, setGeneralId] = React.useState(null);

    function updateGeneralId(newValue) {
        setGeneralId(newValue);
    }
  return (
    <div className="App">
        {/*<Navigaviton/>*/}
        {/*<Resources/>*/}
        <GeneralForm url={generalFormUrl} onFinish={updateGeneralId}/>
        {/*<Workers/>*/}
        {/*<RecruitUnits/>*/}
    </div>
  );
}

export default App;
