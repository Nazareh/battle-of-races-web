import React, {useState} from "react";
import axios from "axios";
import {urls} from '../components/urls';

const Workers = ({general, updateGeneral}) => {
    const [currency, setCurrency] = useState("FOOD");

    const addWorkerToResource = (resourceType) => {
        if (general.resources.idleWorkers > 0) {
            axios.put(urls.putWorkerIntoResource + resourceType + '/' + general.resources.id)
                .then(updateGeneral(general.id));
        }
    }
    const addBuyWorker = () => {
            axios.put(urls.putBuyWorker + currency + '/' + general.resources.id)
                .then(updateGeneral(general.id));
    }

    const setCurrencyToUse = (event) => {
        setCurrency(event.target.value);
    }

    return (
        <div className="white flex flex-column">
            <p className="f3"> Workers</p>
            <div className="outline pa4 flex flex-column justify-start">
                <div className="flex flex-row" >
                    <p >Idle:</p>
                    <p className="pl2">{general.resources.idleWorkers}</p>
                </div>
                <div className="justify-start">
                    <label className="pa4 mv1" htmlFor="currency">Buy using:</label>
                    <select
                        className="mv1 dib bg-black-80 white bg-animate no-underline pv1 ph1 ba b--white-20"
                        id="currency"
                        onClick={event => setCurrencyToUse(event)}>
                        <option selected="true" value="FOOD">Food</option>
                        <option value="WOOD">Wood</option>
                        <option value="GOLD">Gold</option>
                    </select>
                    <button
                        className="mv1 justify-center dib bg-black-80 grow white bg-animate hover-bg-white hover-black no-underline pv1 ph1 br-pill ba b--white-20"
                        onClick={() => addBuyWorker()}>+
                    </button>
                    <p>{Math.pow(general.resources.workersOnFood +
                        general.resources.idleWorkers +
                        general.resources.workersOnGold +
                        general.resources.workersOnWood
                    ,2 )  }
                    </p>
                </div>
            </div>
            <div className="outline pa3 flex flex-row">
                <button
                    className="mv1 justify-center dib bg-black-80 grow white bg-animate hover-bg-white hover-black no-underline pv1 ph1 br-pill ba b--white-20"
                    onClick={() => addWorkerToResource('FOOD')}>
                    +
                </button>
                <p className="pa3">On Food</p>
                <p className="pa3">{general.resources.workersOnFood}</p>
                <p className="pa3">Current Production</p>
                <p className="pa3">{general.resources.foodProduction}</p>
            </div>
            <div className="outline pa3 flex flex-row">
                <button
                    className="mv1 justify-center dib bg-black-80 grow white bg-animate hover-bg-white hover-black no-underline pv1 ph1 br-pill ba b--white-20"
                    onClick={() => addWorkerToResource('WOOD')}>
                    +
                </button>
                <p className="pa3">On Wood</p>
                <p className="pa3">{general.resources.workersOnWood}</p>
                <p className="pa3">Current Production</p>
                <p className="pa3">{general.resources.woodProduction}</p>

            </div>
            <div className="outline pa3 flex flex-row">
                <button
                    className="mv1 justify-center dib bg-black-80 grow white bg-animate hover-bg-white hover-black no-underline pv1 ph1 br-pill ba b--white-20"
                    onClick={() => addWorkerToResource('GOLD')}>
                    +
                </button>
                <p className="pa3">On Gold</p>
                <p className="pa3">{general.resources.workersOnGold}</p>
                <p className="pa3">Current Production</p>
                <p className="pa3">{general.resources.goldProduction}</p>
            </div>
        </div>
    );

}

export default Workers;