import React, {useEffect, useState} from "react";
import CardList from "./CardList";

const MilitaryPoint = ({isAuthenticated}) => {
    const [searchField, setSearchField] = useState('');
    const [searchList, setSearchList] = useState([]);
    const baseList = [{id: 1, name: "Fedido"},
        {id: 2, name: "Marauvilho"},
        {id: 3, name: "Chupim"}];

    const updateList = (event) => {
        event.preventDefault();
        setSearchField(event.target.value);
        const filteredList = baseList.filter(element =>
            element.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setSearchList(filteredList);
    }
    useEffect(() => {
        if (!searchField) {
            setSearchList(baseList)
        };
    }, [searchField]);


    return (
        !!isAuthenticated ?
            <fragment>
                <p className="f3">Military Point</p>
                <div className='flex flex-wrap justify-start  pa3'>

                    <label className="pa3 "> Search by name</label>
                    {/*<select className="tc" onchange={updateList}>*/}
                    {/*    <option selected value="name">Name</option>*/}
                    {/*    <option value="id">id</option>*/}
                    {/*</select>*/}
                    <input type="text"
                           value= {searchField}
                           onChange={updateList}
                           />
                </div>
                <CardList list={searchList}/>
            </fragment>
            :
            <div></div>
    )

}
export default MilitaryPoint