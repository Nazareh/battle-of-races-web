import React, {useEffect} from "react";

const Dashboard = ({armyUnits}) => {
    const rows =[];
    function populateRows (){
        armyUnits.forEach((element) =>
            {
                rows.push(
                    <tr>
                        <td className="pv3 pr3 bb b--black-20">{element.unit.name}</td>
                        <td className="pv3 pr3 bb b--black-20">{element.qty}</td>
                    </tr>
                );
                console.log(rows);
            }
        );
    }
    useEffect(() => {
        console.log('useEffect', armyUnits);
    }, [armyUnits]);
    //
        if (armyUnits == null){
            return (null);
        } else{
            // populateRows();
        return (

            <div className="pa4">
                 <div className="overflow-auto">
                     <table className="f6 w-100 mw8 center" cellSpacing="0">
                         <thead>
                         <tr>
                             <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Unit</th>
                             <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Quantity</th>
                         </tr>
                         </thead>
                         <tbody className="lh-copy">
                         {rows}
                         </tbody>
                     </table>
                 </div>
            </div>
        );}
    }

export default Dashboard;