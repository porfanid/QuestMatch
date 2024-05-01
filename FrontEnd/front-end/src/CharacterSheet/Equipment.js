import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Equipment(){

    const [equipmentPack, setEquipmentPack] = useState([]);
    const [selectedEquipmentPackIndices, setselectedEquipmentPackIndices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEquipmentPackInfo, setselectedEquipmentPackInfo] = useState(null);

    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [showSelectedEquipmentModal, setShowSelectedEquipmentModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let url = 'https://www.dnd5eapi.co/api/equipment-categories/equipment-packs';

        axios.get(url)
            .then( async response => {
                const results =await response.data.equipment;
                setEquipmentPack(results);
                console.log("Equipment Packs: ", results);
            })
            .catch(error => console.error(error));
    }, []);


    const handleEquipmentClick = (equipment) => {
        const equipmentIndex = selectedEquipmentPackIndices.indexOf(equipment.index);
        if (equipmentIndex === -1) {
            setselectedEquipmentPackIndices([...selectedEquipmentPackIndices, equipment.index]);
        } else {
            setselectedEquipmentPackIndices(selectedEquipmentPackIndices.filter(index => index !== equipment.index));
        }
    };

    const selectedEquipmentPack = selectedEquipmentPackIndices.map(index => equipmentPack.find(equipment => equipment.index === index));

    const handleInfoClick = (equipment) => {
        axios.get(`https://www.dnd5eapi.co${equipment.url}`)
            .then(response => {
                setselectedEquipmentPackInfo(response.data);
                console.log(`https://www.dnd5eapi.co${equipment.url}`);
                console.log(response.data);
                setShowModal(true);
            })
            .catch(error => console.error(error));
    };

    const showDetailsAboutEquipment = (equipment) => {
        console.log(equipment);
        axios.get(`https://www.dnd5eapi.co${equipment.item.url}`)
            .then(response => {
                setSelectedEquipment(response.data);
                console.log(response.data);
                setShowSelectedEquipmentModal(true);
            })
            .catch(error => console.error(error));
    }


    return(
        <div className="container mt-5">
            <h1>Equipment Packs</h1>
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="row">
                        {equipmentPack&& equipmentPack.map(equipment => (
                            <div
                                key={equipment.index}
                                className="col mb-3"
                                style={{cursor: 'pointer'}}
                            >
                                <div
                                    className={`card ${selectedEquipmentPackIndices.includes(equipment.index) ? 'bg-primary text-white' : 'bg-dark text-white'}`}
                                    onClick={() => handleEquipmentClick(equipment)}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{equipment.name}</h5>
                                        <i className={"fa fa-circle-info"} onClick={(e) => {
                                            e.stopPropagation();
                                            handleInfoClick(equipment);
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {selectedEquipmentPack.length > 0 && (
                    <div>
                        <h4>Selected Equipment:</h4>
                        <ul>
                            {selectedEquipmentPack.map(equipment => (
                                <li key={equipment.index}>{equipment.name}</li>
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
                <Modal.Header className="bg-dark" closeButton={true}>
                    <Modal.Title>
                        <h3 className={"text-primary"}>{selectedEquipmentPackInfo && selectedEquipmentPackInfo.name}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {selectedEquipmentPackInfo && (
                        <div>
                            {
                                selectedEquipmentPackInfo.contents.map((equipment, index) => {
                                    return (
                                        <div key={index}>
                                            <h5>
                                                <i className={"text-muted"}>Quantity:</i>
                                                <i className={"text-info bg-gradient-primary"}>{equipment.quantity}</i>
                                                <i className={"text-muted"}>Item:</i>
                                                <i onClick={()=>{showDetailsAboutEquipment(equipment)}} className={"text-primary"}>{equipment.item.name}</i>
                                            </h5>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>






            <Modal className={"bg-dark bg-opacity-50"} show={showSelectedEquipmentModal} onHide={() => setShowSelectedEquipmentModal(false)}>
                <Modal.Header className="bg-dark" closeButton={true}>
                    <Modal.Title>
                        <h3 className={"text-primary"}>{selectedEquipment && selectedEquipment.name}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {selectedEquipment && (
                        <div>
                            {selectedEquipment.cost &&
                            <div>
                                Costs: {selectedEquipment.cost.quantity} {selectedEquipment.cost.unit}
                            </div>
                            }
                            <div>
                                Weight: {selectedEquipment.weight}
                            </div>
                            {selectedEquipment.gear_category &&
                            <div>
                                Gear Category: {selectedEquipment.gear_category.name}
                            </div>
                            }

                            {selectedEquipment.desc&&selectedEquipment.desc[0] &&
                                <div>
                                    <span className={"text-info"}>Description:</span><br/> {selectedEquipment.desc[0]}
                                </div>
                            }

                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="secondary" onClick={() => setShowSelectedEquipmentModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
