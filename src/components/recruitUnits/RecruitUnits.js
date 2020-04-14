import React, {useEffect, useState} from "react";
import axios from "axios";

const RecruitUnits = ({getRaceUnitsUrl, postArmyUnitsUrl, general, armies}) => {
    const [unitsRenderer, setUnitsRenderer] = useState(null);
    const [unitsList, setUnitsList] = useState([]);
    const divs = [];
    const [isVisible, setVisibility] = useState(null);

    function calculateMaxRecruitByUnit(unit, resources) {
        return Math.min(
            Math.floor(resources.food >= unit.food ? resources.food / unit.food : 0),
            Math.floor(resources.wood >= unit.wood ? resources.wood / unit.wood : 0),
            Math.floor(resources.gold >= unit.gold ? resources.gold / unit.gold : 0),
        );
    }

    function updatePlaceholders() {
        const estResources = {
            food: general.food,
            wood: general.wood,
            gold: general.gold
        };

        unitsList
            .sort((a, b) => b.qty - a.qty)
            .forEach((element, index) => {
                if (element.qty === 0 || element.qty === null || element.qty === '') {
                    unitsList[index] = element;
                    unitsList[index].maxQty = calculateMaxRecruitByUnit(element.unit, estResources);
                    if (document.getElementById(element.unit.id) !== null) {
                        document.getElementById(element.unit.id).placeholder = unitsList[index].maxQty;
                        document.getElementById(element.unit.id).max = unitsList[index].maxQty;
                    }
                } else {
                    estResources.food = estResources.food - (element.unit.food * element.qty);
                    estResources.wood = estResources.wood - (element.unit.wood * element.qty);
                    estResources.gold = estResources.gold - (element.unit.gold * element.qty);
                    unitsList[index].maxQty = calculateMaxRecruitByUnit(element.unit, estResources);
                }
            });
    }

    function addUnitToList(unit, qty) {
        const newUnitQty = {
            unit: unit,
            qty: qty,
            maxQty: qty === null ?
                calculateMaxRecruitByUnit(unit, {
                    food: general.food,
                    wood: general.wood,
                    gold: general.gold,
                })
                : null
        };
        const index = unitsList.findIndex((e) => e.unit.id === unit.id);
        if (index === -1) {
            unitsList.push(newUnitQty);
        } else {
            unitsList[index] = newUnitQty;
        }
        updatePlaceholders();
    }

    async function getAllRaceUnits() {
        const response = await axios.get(getRaceUnitsUrl + "/" + general.race);
        for (const [index, unit] of response.data.entries()) {
            addUnitToList(unit, null);
            divs.push(
                <div className='pa3' key={index}>
                    <label className='w3 ph3 underline' htmlFor={unit.name}>{unit.name}</label>
                    <input className='w4 ph3 ' type='number'
                           id={unit.id}
                           name={unit.name}
                           min={'0'}
                           value={unitsList[unitsList.findIndex((e) => e.unit.id === unit.id)].qty}
                           placeholder={unitsList[unitsList.findIndex((e) => e.unit.id === unit.id)].maxQty}
                           onChange={event => addUnitToList(unit, event.target.value)}
                           size={2}
                    />
                </div>
            )
        }
        setUnitsRenderer(divs);
        setVisibility(true);
    }

    useEffect(() => {
        if (general !== null) {
            getAllRaceUnits();
        }
    }, [general,isVisible]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const armyUnitsList = [];
        unitsList.forEach(element => armyUnitsList.push({
            id: {
                unitId: element.unit.id,
                armyId: armies[0]
            },
            qty: element.qty
        }));
        axios.post(postArmyUnitsUrl, armyUnitsList)
            .then(response => console.log(response.data));
    };
    if (!isVisible) {
        return null;
    } else {
    return (
               <form className='flex flex-column' onSubmit={handleSubmit}>
                   <div className='flex flex-wrap'>
                       {unitsRenderer}
                   </div>
                   <input className='w-10 center' type='submit' value="Build"/>
               </form>
           );}
};

export default RecruitUnits;