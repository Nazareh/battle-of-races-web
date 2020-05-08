import React, {useState} from "react";
import axios from "axios";
import {urls} from './urls';

const CombatLogs = ({combatLogs,logout}) =>{
    const [logActions,setLogActions] = useState([]);


    if(!combatLogs){
        logout();
        return (
            <div></div>
        )
    }

    const renderLogList = (value,index) =>{
        return (
            <li className="link ma3 list dim gold pointer"
                key={index}
                onClick={ () => renderIndividualLog(value)}
            >{value}</li>
        )
    }

    const renderIndividualLog = (logId) => {

        axios.get(urls.getCombatLog + logId)
            .then(res => {
                renderActions(res.data.actions);
            });
    }

    const renderActions = (actions) =>{
        const actionsList = [];
        actions.forEach(action => {
            actionsList.push(
                <li className="list ma2" >{action}</li>
            )
        });
        setLogActions(actionsList);
         }

    return (
        <div>
            <ul>
                {combatLogs.map((value,index) => renderLogList(value,index))}
            </ul>
            <div>
                {logActions}
            </div>
        </div>
    )
}

export default CombatLogs;