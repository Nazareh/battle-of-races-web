import React, {useState} from "react";
import axios from "axios";
import '../../containers/App.css';

const GeneralForm = (props) => {
    const [generalName, setGeneralName] = useState("");
    const [race, setRace] = useState(null);
    const races = ['HUMAN', 'DWARF', 'NORFS', 'ELF', 'FELIX'];
    const raceRenderer = [];

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(props.url, {
            name: generalName,
            race: race
        })
            .then((response) => {
                props.onFinish(response.data);
            }, (error) => {
                console.log(error);
            });
    };
    const onRaceChange = (event) => {
        setRace(event.currentTarget.value);
    };

    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1)
    };


    for (const [index, value] of races.entries()) {
        raceRenderer.push(
            <div className='pa3 grow w4' key={index}>
                <label>
                    <input type="radio"
                           name="race"
                           value={value}
                           onChange={onRaceChange}/>
                    {' ' + capitalize(value.toLowerCase())}

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
                    {raceRenderer}
                </div>
            </div>
            <div className='outline pa3 link light-yellow'>
                <input type="submit" value="Submit" className='br-pill bg-light-yellow hover-bg-yellow'/>
            </div>
        </form>
    )
};

export default GeneralForm;