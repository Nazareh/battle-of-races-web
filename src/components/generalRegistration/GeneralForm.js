import React, {useState} from "react";
import axios from "axios";
import '../../containers/App.css';

const GeneralForm = (url) => {
    const [generalName, setGeneralName] = useState("");
    const [race, setRace] = useState(null);
    const races = ['HUMAN','DWARF','NORFS','ELF','FELIX'];
    const racesRadio = [];

    const handleSubmit = (event) => {
        const newGeneral = {
            name: generalName,
            race: race
        };
        axios.post(url.url ,newGeneral)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    };
    const onRaceChange = (event) => {
        setRace(event.currentTarget.value);
    };

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    for (const [index, value] of races.entries()) {
        racesRadio.push(
            <div className='pa3 grow w4' key={index}>
                <label>
                    <input type="radio"
                           name="race"
                           value={value}
                           onChange={onRaceChange}/>
                   {' ' +capitalize(value.toLowerCase())}

                </label>
            </div>)
    }

    return (

        <form onSubmit={handleSubmit}
              className='app-bd flex flex-column w-auto light-yellow'>
            <div className='outline grow pa3 '>
                <input type="text" value={generalName}
                       placeholder="General name" className="h2-l bg-light-yellow"
                       onChange={e => setGeneralName(e.target.value)}
                />
            </div>
            <div className='pa3 center yellow'>
                <p className='b'> Choose you race</p>
                <div className='flex flex-wrap tl '>
                    {racesRadio}
                </div>
            </div>
            <div className='outline pa3 link light-yellow'>
                <input type="submit" value="Submit" className='br-pill bg-light-yellow hover-bg-yellow'/>
            </div>
        </form>


    )
};

export default GeneralForm;