import React, {useEffect} from "react";
import axios from "axios";

const Dashboard = ({armyUnits, unitstUrl, general}) => {
    const [rows, setRows] = React.useState([]);
    const tempRows =[];

    async function populateRows () {
      const response = await axios.get(unitstUrl +'/race/' + general.race );

      armyUnits
      .sort((a, b) => a.id.unitId - b.id.unitId)
      .forEach((element,index) => {
        const name = response.data
                   .filter(unit => unit.id == element.id.unitId)
                    .map(filteredUnit => filteredUnit.name);

        tempRows.push(
          <tr key={index}>
              <td className="pv3 pr3 bb b--black-20">{name[0]}</td>
              <td className="pv3 pr3 bb b--black-20">{element.qty}</td>
          </tr>);

      });
      setRows(tempRows);

    }

    useEffect(() => {
   if (armyUnits !== null){
        populateRows();
       }

 },[armyUnits]);

    if (armyUnits === null){
            return (null);
        }
        else{
          return (
              <div className="pa4">
                   <div className="overflow-auto">
                       <table className="f6 w-20 mw8 left" cellSpacing="0">
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
          );
      }
    }

export default Dashboard;
