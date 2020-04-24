import React, {useEffect} from "react";
import axios from "axios";
import {urls} from "./urls";

const Dashboard = ({armyUnits, general}) => {
    const [rows, setRows] = React.useState([]);
    const tempRows = [];

    async function populateRows() {
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
            populateRows();
        }
    }, [armyUnits]);
    if(!armyUnits){
        return <div></div>
    }
    return (
            <div className="pa3 white ">
                <p className="f3">Dashboard</p>
                <div className="overflow-auto">
                    <table className="f6 w20 mw8 left white" cellSpacing="0">
                        <thead >
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
            </div>
    );
}

export default Dashboard;
