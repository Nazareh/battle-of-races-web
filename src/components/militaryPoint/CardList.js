import React, {Fragment} from "react";
import GeneralCard from "./GeneralCard";

const CardList = ({list}) => {
    return (
        <div>
            {list.map(e => <GeneralCard id={e.id}
                                                name={e.name}
            />)
            }
        </div>
    );
};

export default CardList;