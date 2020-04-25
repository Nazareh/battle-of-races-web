import React, {useEffect, useState} from "react";
import axios from "axios";
import {urls} from '../components/urls';
import {navigate} from 'hookrouter';

const RecruitUnits = ({general, updateGeneral, armies, updateArmyUnits}) => {
    const [unitsRenderer, setUnitsRenderer] = useState(null);
    const [unitsList, setUnitsList] = useState([]);
    const [rerender, setrerender] = useState(false);
    const divs = [];

    useEffect(() => {
        if (general !== null) {
            loadForm();
            updateGeneral(general);
        }
    }, [unitsList]);

    function loadForm() {

        axios.get(urls.getUnitsByRace + general.race).then(response => {

                for (const [index, unit] of response.data.entries()) {
                    addUnitToList(unit, null);
                    divs.push(
                        <div className='pa3 w20 justify-between' key={index}>
                            <div><label className='w3 ph3' htmlFor={unit.name}>{unit.name}</label></div>
                            <div><input className='w4 bg-black-80 white center ph2' type='number'
                                        id={unit.id}
                                        name={unit.name}
                                        min={'0'}
                                        value={unitsList[unitsList.findIndex((e) => e.unit.id === unit.id)].qty}
                                        placeholder={unitsList[unitsList.findIndex((e) => e.unit.id === unit.id)].maxQty}
                                        onChange={e => addUnitToList(unit, e.target.value)}
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

    const handleSubmit = () => {
        const armyUnitsList = [];

        unitsList.forEach(element => armyUnitsList.push({
            id: {
                unitId: element.unit.id,
                armyId: armies[0].id
            },
            qty: element.qty
        }));

        axios.post(urls.postArmyUnits, armyUnitsList)
            .then(response => {
                unitsList.forEach(element => {
                    element.qty = null;
                    document.getElementById(element.unit.id).value = null
                });
                updateGeneral(general.id);
                updateArmyUnits(armies);
            });
    };

    return (
        <div className='white flex flex-column'>
            <p className="f3">Recruit units</p>
            <div className='flex flex-wrap'>
                {unitsRenderer}
            </div>
            <div className='pa3'>
                <input
                    className="f6 dib bg-black-80 grow white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                    type='submit' value="Train"
                    onClick={e => handleSubmit()}
                />
            </div>
        </div>
    );
};

export default RecruitUnits;
