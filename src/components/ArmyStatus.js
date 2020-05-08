import React, {useEffect, useState} from "react";
import axios from "axios";
import {urls} from "./urls";
import Login from "./Login";

const ArmyStatus = ({armies, incomingArmies}) => {

    const renderArmy = (army, title) => {

        if (!army) {
            return (<div></div>)
        }

        let headerLabel;
        let row;
        let total = 0;
        let status = army.armyStatus.replace('_', ' ');
        let statusCss;

        // armyUnits.filter(armyUnit => armyUnit.id.armyId === army.id).forEach(armyUnit => total += armyUnit.qty);
        //
        // if (general.race === 'NORFSS') {
        //     total = 'unkown'
        // }

        switch (army.armyStatus) {
            case 'HOME':
                status = army.armyStatus;
                statusCss = "yellow";
                break;
            case 'ATTACKING':
                status = army.armyStatus;
                statusCss = "red";
                headerLabel = 'Turns to Arrive';
                row = army.turnsToArrive;
                break;
            case 'DEFENDING':

                status = army.armyStatus;
                statusCss = "green";
                headerLabel = 'Turns to Arrive';
                row = army.turnsToArrive;
                break;
            case 'RETURNING':
                status = army.armyStatus;
                statusCss = "blue";
                headerLabel = 'Turns to Arrive';
                row = army.turnsToArrive;
                break;
            case 'ON_ENEMY':
                status = army.armyStatus.replace('_', ' ');
                statusCss = "red";
                headerLabel = 'Turns left';
                row = army.turnsLeft;
                break;
            case 'ON_ALLY':
                status = army.armyStatus.replace('_', ' ');
                statusCss = "red";
                headerLabel = 'Turns left';
                row = army.turnsLeft;
                break;
        }

        return (
            <div className="measure-narrow mh1 pa1 white ">
                <p className="f3 tc">{title}</p>
                <table className="f6 w20 mw8 left white" cellSpacing="0">
                    <thead>
                    <tr>
                        <th className="fw6 bb tl pb3 pr3 b--transparent">STATUS</th>
                        <th className="fw6 bb tl pb3 pr3 b--transparent">{headerLabel}</th>
                        <th className="fw6 bb tl pb3 pr3 b--transparent">Units</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={statusCss}>
                        <td className="fw6 bb tl pb3 pr b--black-20">{status}</td>
                        <th className="fw6 bb tc pb3 pr3 b--black-20">{row}</th>
                        <th className="fw6 bb tc pb3 pr3 b--black-20">{total}</th>
                    </tr>
                    </tbody>
                </table>
            </div>);
    }

    return (
        <div className=" flex flex-wrap">
            {renderArmy(armies[0], "My army")}
            {incomingArmies.map(army => renderArmy(army, army.generalName))}

            {/*{renderArmy(incomingArmies[0], "Enemy army")}*/}
            {/*{incomingArmies.forEach(army => renderArmy(army, army.generalName))}*/}
            {/*{renderArmy(incomingArmies[0], incomingArmies[0].generalName)}*/}
        </div>
    );
}

export default ArmyStatus;
