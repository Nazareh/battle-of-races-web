import React from "react";

const Resources = ({general}) => {
    if (!!general) {
        return (
            <div className='flex justify-center'>
                <div className='ph3 white'>
                    <p> {general.name} </p>
                </div>
                <div className='flex justify-center'>
                    <div className='outline pa3 '> Food {general.resources.food} </div>
                    <div className='outline pa3'> Wood {general.resources.wood} </div>
                    <div className='outline pa3'> Gold {general.resources.gold} </div>
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
