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
              className='outline flex flex-column w-auto'>
            <div className="measure pa3 tl">
                <label htmlFor="name" className="f6 b db mb2">
                    General name
                </label>
                <input
                    id="name"
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    value={generalName}
                    onChange={e => setGeneralName(e.target.value)}
                    aria-describedby="name-desc"/>
                <small id="name-desc" className="f6 black-60 db mb2">
                    How others should call you?
                </small>
            </div>
            <div className='pa3 center'>
                <p className='b'> Choose you race</p>
                <div className='flex flex-wrap tl '>
                    {raceRenderer}
                </div>
            </div>
            <div className='pa3 link'>
                <input type="submit" value="Create"/>
            </div>
        </form>
    )
};

export default GeneralForm;