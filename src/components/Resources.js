import React from "react";

const Resources = ({general}) => {

    if (!!general) {
        return (
            <div className='flex justify-center'>
                <div className='ph3 white'>
                    <p> {general.name} </p>
                </div>
                <div className='flex justify-center'>
                    <div className='outline pa3 '> Food {general.food} </div>
                    <div className='outline pa3'> Wood {general.wood} </div>
                    <div className='outline pa3'> Gold {general.gold} </div>
                </div>
                <div className='ph3 white'>
                    <p> XP: {general.xp} </p>
                </div>
            </div>
        )
    }else
    return (<div></div>)
};

export default Resources;
