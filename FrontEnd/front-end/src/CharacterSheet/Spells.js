import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpellsOptions = ({ selectedClass, selectedRace, selectedLevel }) => {
    const [spells, setSpells] = useState([]);
    const [selectedSpellIndices, setSelectedSpellIndices] = useState([]);

    useEffect(() => {
        // Fetch spells from the API based on selected class and race
        let url = 'https://www.dnd5eapi.co/api/spells';

        if (selectedClass && selectedRace) {
            url = `https://www.dnd5eapi.co/api/spells?classes=${selectedClass.index}&races=${selectedRace.index}&level=${selectedLevel}`;
        } else if (selectedClass) {
            url = `https://www.dnd5eapi.co/api/spells?classes=${selectedClass.index}`;
        } else if (selectedRace) {
            url = `https://www.dnd5eapi.co/api/spells?races=${selectedRace.index}`;
        }

        axios.get(url)
            .then(response => setSpells(response.data.results))
            .catch(error => console.error(error));
    }, [selectedClass, selectedRace]);

    // Event handler for selecting a spell
    const handleSpellClick = (spell) => {
        // Check if the spell is already in the selectedSpells array
        const spellIndex = selectedSpellIndices.indexOf(spell.index);

        if (spellIndex !== -1) {
            // If the spell is already selected, remove it from the array
            setSelectedSpellIndices(prevSelectedSpellIndices => prevSelectedSpellIndices.filter(index => index !== spell.index));
        } else {
            // If the spell is not selected, add it to the array
            setSelectedSpellIndices(prevSelectedSpellIndices => [...prevSelectedSpellIndices, spell.index]);
        }
    };

    // Get the selected spell objects based on their indices
    const selectedSpells = selectedSpellIndices.map(index => spells.find(spell => spell.index === index));

    return (
        <div className="container mt-5">
            <h1>Spell Options</h1>
            <div className="row mt-4">
                <div className="col-md-12">
                    <h2>Spells</h2>
                    <div className="row">
                        {spells.map(spell => (
                            <div
                                key={spell.index}
                                className={`col mb-3`}
                                onClick={() => handleSpellClick(spell)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={`card ${selectedSpellIndices.includes(spell.index) ? 'bg-primary text-white' : 'bg-dark text-white'}`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{spell.name}</h5>
                                        {/* Add more spell details as needed */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {selectedSpells.length > 0 && (
                    <div>
                        <h4>Selected Spells:</h4>
                        <ul>
                            {selectedSpells.map(spell => (
                                <li key={spell.index}>{spell.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpellsOptions;
