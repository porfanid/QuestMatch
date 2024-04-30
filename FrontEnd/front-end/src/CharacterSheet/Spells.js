import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

const SpellsOptions = ({ selectedClass, selectedRace, selectedLevel, setSelectedSpells }) => {
    const [spells, setSpells] = useState([]);
    const [selectedSpellIndices, setSelectedSpellIndices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSpellInfo, setSelectedSpellInfo] = useState(null);

    const navigate=useNavigate();

    const components={
        "V":"Verbal",
        "S":"Somatic",
        "M": "material components"
    }

    useEffect(() => {
        let url = 'https://www.dnd5eapi.co/api/spells';

        if (selectedClass && selectedRace) {
            url = `https://www.dnd5eapi.co/api/classes/${selectedClass.index}/spells?classes=&races=${selectedRace.index}&level=${selectedLevel}`;
        } else if (selectedClass) {
            url = `https://www.dnd5eapi.co/api/classes/${selectedClass.index}/spells`;
        } else if (selectedRace) {
            url = `https://www.dnd5eapi.co/api/spells?races=${selectedRace.index}`;
        }

        axios.get(url)
            .then(response => setSpells(response.data.results))
            .catch(error => console.error(error));
    }, [selectedClass, selectedRace, selectedLevel]);

    const handleSpellClick = (spell) => {
        const spellIndex = selectedSpellIndices.indexOf(spell.index);
        if (spellIndex === -1) {
            setSelectedSpellIndices([...selectedSpellIndices, spell.index]);
        } else {
            setSelectedSpellIndices(selectedSpellIndices.filter(index => index !== spell.index));
        }
    };

    const handleInfoClick = (spell) => {
        // Fetch spell details from the spell's URL
        axios.get(`https://www.dnd5eapi.co${spell.url}`)
            .then(response => {
                setSelectedSpellInfo(response.data);
                console.log(response.data);
                setShowModal(true);
            })
            .catch(error => console.error(error));
    };

    const selectedSpells = selectedSpellIndices.map(index => spells.find(spell => spell.index === index));

    const renderFormattedDescription = (descriptions) => {
        return (
            <ul>
                {descriptions.map((desc, index) => (
                    <li key={index} dangerouslySetInnerHTML={{__html:formatDescription(desc)}}/>
                ))}
            </ul>
        );
    };

    const formatDescription = (description) => {
        // Replace ***emphasize*** with <strong>emphasize</strong>
        return description.replace(/\*\*\*(.*?)\*\*\*/g, '<strong>$1</strong>');
    };

    return (
        <div className="container mt-5">
            <h1>Spells</h1>
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="row">
                        {spells.map(spell => (
                            <div
                                key={spell.index}
                                className="col mb-3"
                                style={{ cursor: 'pointer' }}
                            >
                                <div
                                    className={`card ${selectedSpellIndices.includes(spell.index) ? 'bg-primary text-white' : 'bg-dark text-white'}`}
                                    onClick={() => handleSpellClick(spell)}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{spell.name}</h5>
                                        <i className={"fa fa-circle-info"} onClick={(e) => { e.stopPropagation(); handleInfoClick(spell); }}     />
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
                <button onClick={() => {
                    navigate("/character/equipment");
                }} className="btn btn-primary btn-large">Submit
                </button>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header className="bg-dark">
                    <Modal.Title>
                    <h3 className={"text-primary"}>{selectedSpellInfo && selectedSpellInfo.name}</h3><br/>
                        {selectedSpellInfo && selectedSpellInfo.ritual &&
                            <span className={"text-warning"}>Ritual</span>}
                        <span className={"text-info"}>Range: {selectedSpellInfo && selectedSpellInfo.range}</span><br/>
                        <span className={"text-info"}>Duration: {selectedSpellInfo && selectedSpellInfo.duration}</span>
                    </Modal.Title>


                    <div>
                        Components
                        <ul>
                            {selectedSpellInfo&&
                                selectedSpellInfo.components.map((component, index) => (
                                    <li key={index}>{components[component]}
                                        <p>
                                            {(component==="M")&&selectedSpellInfo.material}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {selectedSpellInfo && (
                        <div>
                            {renderFormattedDescription(selectedSpellInfo.desc)}
                            {/* Add more spell details as needed */}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SpellsOptions;
