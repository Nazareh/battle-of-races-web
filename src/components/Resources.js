import React from "react";

const Resources = ({general,war,logout}) => {
    if (!!general && !!war) {
        return (
            <div className='flex bg-black-70  justify-center'>
                <div className='tl fw9 ph3'>
                    <p> {general.name} </p>
                </div>
                <div className='flex fw1 justify-center'>
                    <div className='pa3 dark-red'> Food {general.resources.food} </div>
                    <div className='pa3 dark-green'> Wood {general.resources.wood} </div>
                    <div className='pa3 gold'> Gold {general.resources.gold} </div>
                </div>
                <div className='ph3 fw1'>
                    <p> Tech Points: {general.researchPoints} </p>
                </div>
                <div className='ph3 fw1'>
                    <p> XP: {general.xp} </p>
                </div>
                <div className='ph3 fw1'>
                    <p> Turn {war.currentTurn} of {war.endTurn} </p>
                </div>
            </div>
        )
    }else {
        return (<div></div>)
    }
};

export default Resources;
