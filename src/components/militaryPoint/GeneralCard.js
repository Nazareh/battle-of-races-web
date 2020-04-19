import React from "react";
import './GeneralCard.css'

const GeneralCard = ({id,name}) => {
    return (
        <div className='tc bg-navy white dib br3 pa3 ma2 grow bw2 shadow-5'>
            <div>
                <h2>{name}</h2>
                <button className="btn ma2">Attack </button>
                <button className="btn ma2">Deffend </button>
            </div>
        </div>
    );
};

export default GeneralCard;