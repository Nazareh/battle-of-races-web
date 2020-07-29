import React, {useState} from "react";

const RecruitUnits = ({units, recruitUnits,armies, resources, logout}) => {
    const [unitsToRecruit, setUnitsToRecruit] = useState([]);

    if (!units || !resources) {
        logout();
        return (<div></div>)
    }
    const calculateMaxRecruitByUnit = (unit, resources) => {
        return Math.min(
            Math.floor(resources.food >= unit.food ? resources.food / unit.food : 0),
            Math.floor(resources.wood >= unit.wood ? resources.wood / unit.wood : 0),
            Math.floor(resources.gold >= unit.gold ? resources.gold / unit.gold : 0),
        );
    }

    const cancelCourse = () => {
        document.getElementById("1").reset();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        recruitUnits(unitsToRecruit);
        document.getElementById("unitsForm").reset();
    }

    const updateList = (e) => {
        const unitsList = unitsToRecruit;
        const index = unitsList.findIndex(entry => entry.id.unitId === e.target.id);

        (index >= 0)
            ? unitsList[index].qty = e.target.value
            : unitsList.push(
                {
                    id: {
                        unitId: e.target.id,
                        armyId: armies[0].id
                    },
                    qty: e.target.value
                }
            );

        setUnitsToRecruit(unitsList);
    }



    return (
        <form onSubmit={onSubmit}
              id="unitsForm"
              className="measure center mv5 flex flex-column pa4 bg-black-70 shadow-5">
            <div className="mv3 flex-row">
                {units.map(unit =>
                    <div className="mt2">
                        <label className="db fw4 lh-copy f5" htmlFor={units.id}>{unit.name}
                        <span className="white-40"> {calculateMaxRecruitByUnit(unit,resources)} max</span></label>
                        <input
                            // className="pa2 input-reset ba bg-black-80 hover-white white w-100"
                               type="number"
                               name={unit.name}
                               min={0}
                               max={calculateMaxRecruitByUnit(unit,resources)}
                               onChange={ event => updateList(event)}
                               id={unit.id}/>
                    </div>
            )}
            </div>
            <div>
                <button className="f6 dib bg-dark-green grow white bg-animate hover-bg-green hover-white no-underline pv2 ph4 br-pill ba b--white-20" href="#0"
                        type="submit"
                >
                    Recruit
                </button>
            </div>
        </form>
    )
}

export default RecruitUnits;