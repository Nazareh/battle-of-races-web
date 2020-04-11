import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";

const RecruitUnits = ({url, general}) => {
    const [unitsRenderer, setUnitsRenderer] = useState(null);
    const [unitsList, setUnitsList] = useState([]);
    const divs = [];

    function calculateMaxRecruitByResource(unitCost, totalAmount) {
        const max = totalAmount >= unitCost ? totalAmount / unitCost : 0;
        return Math.floor(max);
    }

    function calculateMaxRecruitByUnit(unit, resources) {
        return Math.min(
            calculateMaxRecruitByResource(unit.food, resources.food),
            calculateMaxRecruitByResource(unit.wood, resources.wood),
            calculateMaxRecruitByResource(unit.gold, resources.gold)
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
            .forEach(element => {
                if (document.getElementById(element.unit.id) !== null) {
                    if (element.qty === 0) {
                        document.getElementById(element.unit.id).placeholder = calculateMaxRecruitByUnit(element.unit, estResources);
                    } else {
                        estResources.food = estResources.food - (element.unit.food * element.qty);
                        estResources.wood = estResources.wood - (element.unit.wood * element.qty);
                        estResources.gold = estResources.gold - (element.unit.gold * element.qty);
                    }
                }
            });
    }

    function addUnitToList(unit, qty) {

        const unitQty = {
            unit: unit,
            qty: qty || 0
        };
        const helperArray = unitsList;

        const index = helperArray.findIndex((e) => e.unit.id === unit.id);

        if (index === -1) {
            helperArray.push(unitQty);
        } else {
            helperArray[index] = unitQty;
        }
        setUnitsList(helperArray);
        updatePlaceholders()
    }

    async function getData() {
        if (general !== null) {
            const response = await axios.get(url + "/" + general.race);

            for (const [index, unit] of response.data.entries()) {
                addUnitToList(unit, 0);
                divs.push(
                    <div className='pa3' key={index}>
                        <label className='w3 ph3 underline' htmlFor={unit.name}>{unit.name}</label>
                        <input className='w2 ph3' type="number"
                               id={unit.id}
                               name={unit.name}
                               placeholder={calculateMaxRecruitByUnit(unit, {
                                   food: general.food,
                                   wood: general.wood,
                                   gold: general.gold,
                               })}
                               onChange={event => addUnitToList(unit, event.target.value)}
                               size={2}
                        />
                    </div>
                )
            }
            setUnitsRenderer(divs);
        }
    }

    useEffect(() => {
        getData();
    }, [general, unitsList]);
    return (
        <form className='flex flex-wrap' name={'recruitForm'}>
            {unitsRenderer}
        </form>
    );
};

export default RecruitUnits;