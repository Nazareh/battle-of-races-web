import React from "react";

export const Resources = ({
  general
}) => {
  if (general !== null) {
    return (
      <div className='flex justify-center'>
        <div className='outline pa3 '> Food {general.food} </div>
        <div className='outline pa3'> Wood {general.wood} </div>
        <div className='outline pa3'> Gold {general.gold} </div>
      </div>
  )}
  else {
    return <div> </div>
  }
}
