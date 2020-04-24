import React, {useEffect, useState} from "react";
import CardList from "./CardList";
import {urls} from "../urls";
import axios from "axios";

const MilitaryPoint = ({general}) => {
    const [searchField, setSearchField] = useState('');
    const [searchList, setSearchList] = useState([]);
    let baseList = [];

    const updateList = (event) => {
        event.preventDefault();
        setSearchField(event.target.value);
        const filteredList = baseList.filter(element =>
            element.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setSearchList(filteredList);
    }
    useEffect(() => {
        if (!searchField) {
            axios.get(urls.getOpponentes + general.id)
                .then(res => {
                        setSearchList(res.data)
                    baseList = res.data;
                    }
                );
        };
    }, [searchField]);

    return (
            <fragment>
                <p className="f3 white">Military Point</p>
                <div className='flex flex-wrap justify-start pa3'>

                    <label className="db white fw6 lh-copy f6" htmlFor="searchBox"> Search by name</label>
                    <input className="pa2 input-reset ba bg-black-80 white w-100"
                           type="text"
                           name="searchBox"
                           value= {searchField}
                           onChange={updateList}
                           />
                </div>
                <CardList generalId={general.id}
                          list={searchList}/>
            </fragment>
    )

}
export default MilitaryPoint