import React from "react";
import './GeneralCard.css';
import axios from "axios";
import {urls} from "../urls";

const GeneralCard = ({opponentId, name, action, armyId}) => {

    const executeAction = (e) => {
        const combatRequest = {
            sender: {
                id: armyId
            },
            receiver: {
                id: opponentId
            },
            turnsDuration: 1
        }
        axios.post(urls.postCombat, combatRequest)
            .then(response => {
                if (response.status === 201) {
                    alert('Army has been sent')
                }
            })
            .catch(error => {
                alert(error.response.data.message);
            })
        ;
    }

    return (
        <div className='tc white bg-black-80 dib br1 pa1 ma1 grow bw1 shadow-5 bg-black-30'>
            <div>
                <h3>{name}</h3>
                <input
                    id={opponentId}
                    className="f6 dib  bg-black-80 grow white bg-animate hover-bg-white hover-black pv2 ph4 br-pill ba b--white-20"
                    type='submit'
                    value={action}
                    onClick={e => executeAction(e)}
                />
            </div>
        </div>
    );
};

export default GeneralCard;