import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpellsOptions = ({ selectedClass, selectedRace, selectedLevel, setSelectedSpells }) => {
    const [spells, setSpells] = useState([]);
    const [selectedSpellIndices, setSelectedSpellIndices] = useState([]);

    const [maxSpells, setMaxSpells]=useState(0)

    console.log("Selected Level is "+selectedLevel);

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

        axios.get(`https://www.dnd5eapi.co/api/classes/${selectedClass.index}/levels/${selectedLevel}`).then(
            (response)=>{
                console.log(response.data);
                if(response.data.spellcasting){
                    let total = 0;
                    for (const key in response.data.spellcasting) {
                        if (Object.prototype.hasOwnProperty.call(response.data.spellcasting, key)) {
                            total += response.data.spellcasting[key];
                        }
                    }
                    setMaxSpells(total);
                    console.log(total);
                }
            }
        )

        axios.get(url)
            .then(response => setSpells(response.data.results))
            .catch(error => console.error(error));
    }, [selectedClass, selectedRace, selectedLevel]);

    // Event handler for selecting a spell
    const handleSpellClick = (spell) => {
        // Check if the spell is already in the selectedSpells array
        const spellIndex = selectedSpellIndices.indexOf(spell.index);

        if (spellIndex !== -1) {
            // If the spell is already selected, remove it from the array
            setSelectedSpellIndices(prevSelectedSpellIndices => prevSelectedSpellIndices.filter(index => index !== spell.index));
        } else {
            if(selectedSpellIndices.length>=maxSpells){
                alert("You can't choose more spells.")
            }else {
                // If the spell is not selected, add it to the array
                setSelectedSpellIndices(prevSelectedSpellIndices => [...prevSelectedSpellIndices, spell.index]);
            }
        }
        setSelectedSpells(selectedSpellIndices);
    };

    // Get the selected spell objects based on their indices
    const selectedSpells = selectedSpellIndices.map(index => spells.find(spell => spell.index === index));

    return (
        <div className="container mt-5">
            <h1>Spells</h1>
            <div className="row mt-4">
                <div className="col-md-12">
                    <h2>{maxSpells-selectedSpellIndices.length} left</h2>
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
