import React, {useEffect, useState} from "react";
import axios from "axios";
import {urls} from '../components/urls';

const Workers = ({general, updateGeneral,logout}) => {
    const [currency, setCurrency] = useState("");

    const addWorkerToResource = (resourceType) => {
        if (general.resources.idleWorkers > 0) {
            axios.put(urls.putWorkerIntoResource + resourceType + '/' + general.resources.id)
                .then(updateGeneral(general.id));
        }
    }
    const buyWorker = () => {
            axios.put(urls.putBuyWorker + currency + '/' + general.resources.id)
                .then(updateGeneral(general.id));
    }

    const setCurrencyToUse = (event) => {
        setCurrency(event.target.value);

    }
    if(general === null){
        logout();
        return (
            <div></div>
        )
    }
    return (
        <div className="white measure flex flex-column pa4">
            <p className="f3"> Workers</p>
            <div className="outline pa1 flex flex-column justify-start">
                <div className="flex ma3 flex-row" >
                        <p className="dib ma1">Idle:</p>
                    <p className="dib ma1">{general.resources.idleWorkers}</p>
                </div>
                <div className="flex dib flex-wrap mh3 items-center">
                    <label className=" ma1"
                           htmlFor="currency">Buy using:
                    </label>
                    <p className="dib ma1 ">
                        {Math.pow(general.resources.workersOnFood +
                        general.resources.idleWorkers +
                        general.resources.workersOnGold +
                        general.resources.workersOnWood
                        ,2 )  }
                    </p>
                    <select
                        className="bg-black-80 white bg-animate no-underline ph1 ma1 ba h2 b--white-20"
                        id="currency"
                        onClick={event => setCurrencyToUse(event)}>
                        <option selected="true" value="FOOD">Food</option>
                        <option value="WOOD">Wood</option>
                        <option value="GOLD">Gold</option>
                    </select>
                    <input
                        className="f6 bg-black-80 grow white bg-animate ma1 hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                        type="submit" value="BUY"
                        onClick={() => buyWorker()}
                    />
                </div>
            </div>
            <div className="outline flex flex-row">
                <input
                    className="f6 dib bg-black-80 grow ma3 white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                    type="submit" value="ADD"
                    onClick={() => addWorkerToResource("FOOD")}
                />
                <p className="pa1">On Food</p>
                <p className="pa1">{general.resources.workersOnFood}</p>
                <p className="pa1">Current Production</p>
                <p className="pa1">{general.resources.foodProduction}</p>
            </div>
            <div className="outline flex flex-row">
                <input
                    className="f6 dib bg-black-80 grow ma3 white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                    type="submit" value="ADD"
                    onClick={() => addWorkerToResource('WOOD')}
                />
                <p className="pa1">On Wood</p>
                <p className="pa1">{general.resources.workersOnWood}</p>
                <p className="pa1">Current Production</p>
                <p className="pa1">{general.resources.woodProduction}</p>

            </div>
            <div className="outline flex flex-row">
                <input
                    className="f6 dib bg-black-80 grow ma3 white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                    type="submit" value="ADD"
                    onClick={() => addWorkerToResource('GOLD')}
                />
                <p className="pa1">On Gold</p>
                <p className="pa1">{general.resources.workersOnGold}</p>
                <p className="pa1">Current Production</p>
                <p className="pa1">{general.resources.goldProduction}</p>
            </div>
        </div>
    );

}

export default Workers;