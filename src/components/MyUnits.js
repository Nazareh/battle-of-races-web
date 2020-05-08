import React, {useEffect, useState} from "react";
import axios from "axios";
import {urls} from "./urls";


const MyUnits = ({general, myUnits,logout}) =>{
    const [rows, setRows] = useState([]);

    const tempRows = [];

    useEffect(() => {
        if (!!myUnits) {
            mountUnits();
        }
    }, [myUnits]);


    async function mountUnits() {
        const response = await axios.get(urls.getUnitsByRace + general.race);
        myUnits
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

    if(!general){
        return (<div></div>)
    }
    return(
    <div className="measure-narrow pa3 white ">
        <p className="f3 tc">All Units</p>
        <div className="flex flex-row">
            <div className="pa4 outline center overflow-auto">
                <table className="f6 w20 mw8 left white" cellSpacing="0">
                    <thead>
                    <tr>
                        {/*<th className="fw6 bb tl pb3 pr3 b--transparent ">Unit</th>*/}
                        <th className="fw6 bb tl pb3 pr3 b--transparent">Quantity</th>
                    </tr>
                    </thead>
                    <tbody className="lh-copy">
                    {rows}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default MyUnits;