import React, {useState} from "react";
import CardList from "./CardList";

const MilitaryPoint = ({general, armies,logout,opponents}) => {
    const [searchField, setSearchField] = useState('');
    const [searchList, setSearchList] = useState(opponents);

    if(general === null){
        logout();
        return (
            <div></div>
        )
    }

    const updateList = (event) => {

        setSearchField(event.target.value);

        const filteredList = opponents.filter(element =>
            element.name.toLowerCase().includes(event.target.value.toLowerCase()));

        setSearchList(filteredList);
    }

    return (
        <div className="measure center mv5 flex flex-column pa4 bg-black-70">
            <p className="f3 tc">Military Point</p>
            <div className='flex flex-wrap'>
                <label className="db fw6 lh-copy f6" htmlFor="searchBox"> Search by name</label>
                <input className="pa2 input-reset ba w-100"
                       type="text"
                       name="searchBox"
                       value={searchField}
                       onChange={ event => updateList(event)}
                />
            </div>
            <div className="pa2">
            <CardList generalId={general.id}
                      armyId={armies[0].id}
                      list={searchList}/>
            </div>
        </div>
    )

}
export default MilitaryPoint