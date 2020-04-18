import React, {useEffect, useState} from "react";
import axios from "axios";

const RecruitUnits = ({isAuthenticated, getRaceUnitsUrl, postArmyUnitsUrl, general, updateGeneral, armies, updateArmyUnits}) => {
    const [unitsRenderer, setUnitsRenderer] = useState(null);
    const [unitsList, setUnitsList] = useState([]);
    const divs = [];

    useEffect(() => {
        if (general !== null) {
            loadForm();
        }
    }, [general]);

    function loadForm() {

        axios.get(getRaceUnitsUrl + "/race/" + general.race).then(response => {

                for (const [index, unit] of response.data.entries()) {
                    addUnitToList(unit, null);
                    divs.push(
                        <div className='pa3 w20 justify-between' key={index}>
                            <div><label className='w3 ph3 underline' htmlFor={unit.name}>{unit.name}</label></div>
                            <div><input className='w4 center ph2' type='number'
                                        id={unit.id}
                                        name={unit.name}
                                        min={'0'}
                                value={unitsList[unitsList.findIndex((e) => e.unit.id === unit.id)].qty}
                                placeholder={unitsList[unitsList.findIndex((e) => e.unit.id === unit.id)].maxQty}
                                onChange={event => addUnitToList(unit, event.target.value)}
                                        size={2}
                            />
                            </div>
                        </div>
                    )
                }
                setUnitsRenderer(divs);
            }
        )
    }

    function calculateMaxRecruitByUnit(unit, resources) {
        return Math.min(
            Math.floor(resources.food >= unit.food ? resources.food / unit.food : 0),
            Math.floor(resources.wood >= unit.wood ? resources.wood / unit.wood : 0),
            Math.floor(resources.gold >= unit.gold ? resources.gold / unit.gold : 0),
        );
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
        unitsList.sort((a, b) => b.qty - a.qty);
        updatePlaceholders();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const armyUnitsList = [];

        unitsList.forEach(element => armyUnitsList.push({
            id: {
                unitId: element.unit.id,
                armyId: armies[0].id
            },
            qty: element.qty
        }));

        axios.post(postArmyUnitsUrl, armyUnitsList)
            .then(response => {
                unitsList.forEach(element => {
                    element.qty = null;
                    document.getElementById(element.unit.id).value = null
                });
                updateGeneral(general.id);
                updateArmyUnits(armies)
            });
    };

    return (
        !!isAuthenticated ?
            <form className='outline flex flex-column' onSubmit={handleSubmit}>
                <div className='flex flex-wrap'>
                    {unitsRenderer}
                </div>
                <div className='pa3'>
                    <input className='w-25 center' type='submit' value="Train"/>
                </div>
            </form>
            :
            <div></div>
    );
};

export default RecruitUnits;
