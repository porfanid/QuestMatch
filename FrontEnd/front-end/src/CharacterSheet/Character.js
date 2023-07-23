import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const CharacterOptions = ({ selectClass, selectRace, setSelectedLevel }) => {
    const navigate=useNavigate();
    const [dnd_race, setDndRace] = useState([]);
    const [dnd_class, setDndClass] = useState([]);
    const [selectedRace, setSelectedRace] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    useEffect(() => {
        // Fetch races from the API
        axios.get('https://www.dnd5eapi.co/api/races')
            .then(response => setDndRace(response.data.results))
            .catch(error => console.error(error));

        // Fetch classes from the API
        axios.get('https://www.dnd5eapi.co/api/classes')
            .then(response => setDndClass(response.data.results))
            .catch(error => console.error(error));
    }, []);

    // Event handler for selecting a race
    const handleRaceClick = (race) => {
        setSelectedRace(race);
        selectRace(race);
    };

    const spellClick=(e)=>{
        navigate("/character/spells");
    };

    // Event handler for selecting a class
    const handleClassClick = (characterClass) => {
        setSelectedClass(characterClass);
        selectClass(characterClass);
    };

    return (
        <div className="container mt-5">
            <h1>Character Options</h1>
            <div className="row mt-4">

                <div className="col-md-6">
                    <label htmlFor="level">Select Level:</label>
                    <input
                        type="number"
                        id="level"
                        min="1"
                        max="20"
                        onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                    />
                </div>
                <div className="col-md-6">
                    <h2>Races</h2>
                    <div className="row">
                        {dnd_race.map(race => (
                            <div
                                key={race.index}
                                className={`col mb-3`}
                                onClick={() => handleRaceClick(race)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={`card ${selectedRace === race ? 'bg-primary text-white' : 'bg-dark'}`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{race.name}</h5>
                                        {/* Add more race details as needed */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>Classes</h2>
                    <div className="row">
                        {dnd_class.map(characterClass => (
                            <div
                                key={characterClass.index}
                                className={`col mb-3`}
                                onClick={() => handleClassClick(characterClass)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={`card ${selectedClass === characterClass ? 'bg-primary text-white' : 'bg-dark'}`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{characterClass.name}</h5>
                                        {/* Add more class details as needed */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {selectedRace && <p>Selected Race: {selectedRace.name}</p>}
                {selectedClass && <p>Selected Class: {selectedClass.name}</p>}
                <button onClick={spellClick} className="btn btn-primary btn-large">Submit</button>
            </div>
        </div>
    );
};

export default CharacterOptions;
