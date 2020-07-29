import React, {useState} from "react";

const RecruitUnits = ({units, recruitUnits, resources, logout}) => {

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
    return (
        <form onSubmit={recruitUnits}
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
                               id={unit.id}/>
                    </div>
            )}
            </div>
            <div>
                <a className="f6 dib bg-dark-green grow white bg-animate hover-bg-green hover-white no-underline pv2 ph4 br-pill ba b--white-20" href="#0">Recruit</a>
            </div>
        </form>
    )
}

export default RecruitUnits;