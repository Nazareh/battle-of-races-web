import React, {Fragment} from "react";
import GeneralCard from "./GeneralCard";

const CardList = ({generalId,list}) => {
    return (
        <div>
            {list.map(e => <GeneralCard opponentId={e.id}
                                        name={e.name}
                                        action={"Attack"}
                                        generalId={generalId}
            />)
            }
        </div>
    );
};

export default CardList;