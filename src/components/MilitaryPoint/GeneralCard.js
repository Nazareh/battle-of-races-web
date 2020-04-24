import React from "react";
import './GeneralCard.css';
import axios from "axios";
import {urls} from "../urls";

const GeneralCard = ({opponentId,name,action,generalId}) => {

    const executeAction = (e) => {
        const combat = {
            id:null,
            attackers: [{id: generalId}],
            defenders: [{id: opponentId}]
        }

        axios.post(urls.postCombat,combat)
            .then(alert('Army sent'));

    }

    return (
        <div className='tc white bg-black-80 dib br1 pa1 ma1 grow bw1 shadow-5'>
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