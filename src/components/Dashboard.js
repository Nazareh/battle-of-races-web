import React, {useEffect, useState} from "react";
import axios from "axios";
import {urls} from "./urls";

const Dashboard = ({armyUnits, general, armies}) => {
    const [rows, setRows] = useState([]);
    const [incomingArmies] = useState([]);
    const [myArmies] = useState([armies]);

    const tempRows = [];

    async function getUnits() {
        const response = await axios.get(urls.getUnitsByRace + general.race);
        armyUnits
            .sort((a, b) => a.id.unitId - b.id.unitId)
            .forEach((element, index) => {
                const name = response.data
                    .filter(unit => unit.id === element.id.unitId)
                    .map(filteredUnit => filteredUnit.name);

                tempRows.push(
                    <tr key={index}>
                        <td className="pv3 tl pr3 bb b--black-20">{name[0]}</td>
                        <td className="pv3    pr3 bb b--black-20">{element.qty}</td>
                    </tr>);

            });
        setRows(tempRows);
    }

    useEffect(() => {
        if (!!armyUnits) {
            getUnits();
        }
    }, [armyUnits]);

    if (!armyUnits) {
        return <div></div>
    }

    const renderArmy = (army) => {
        let headerLabel;
        let row;
        let total = 0;
        let status = army.armyStatus.replace('_', ' ');
        let statusCss;

        armyUnits.filter(armyUnit => armyUnit.id.armyId === army.id).forEach(armyUnit => total += armyUnit.qty);

        if (general.race === 'NORFSS') {
            total = 'unkown'
        }

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
            <div className="pa4 overflow-auto">
                <table className="f6 w20 mw8 left white" cellSpacing="0">
                    <thead>
                    <tr>
                        <th className="fw6 bb tl pb3 pr3 b--transparent">STATUS</th>
                        <th className="fw6 bb tl pb3 pr3 b--transparent">{headerLabel}</th>
                        <th className="fw6 bb tl pb3 pr3 b--transparent">Units</th>
                    </tr>
                    </thead>
                    <tbody className="lh-copy">
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
        <div className="pa3 white ">
            <p className="f3">Dashboard</p>
            <p className="f5">Your armies</p>
            <div className="flex flex-row">
                <div className="pa4 overflow-auto">
                    <table className="f6 w20 mw8 left white" cellSpacing="0">
                        <thead>
                        <tr>
                            <th className="fw6 bb tl pb3 pr3 b--transparent ">Unit</th>
                            <th className="fw6 bb tl pb3 pr3 b--transparent">Quantity</th>
                        </tr>
                        </thead>
                        <tbody className="lh-copy">
                        {rows}
                        </tbody>
                    </table>
                </div>
                <div> {renderArmy(armies[0])}</div>
            </div>
            <div>
                <p className="f5">Incoming</p>
                <div> {renderArmy(armies[0])}</div>
            </div>
        </div>
    );
}

export default Dashboard;
