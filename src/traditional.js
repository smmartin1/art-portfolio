import {useState, useEffect} from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

import './App.css';

export const Traditional = () => {
    const [art, setArt] = useState([]);
    const [viewArt, setViewArt] = useState(art);
    const [modalID, setModalID] = useState();
    const [viewModal, setViewModal] = useState(false);

    const modalOpen = (id) => {
        setModalID(id);
        setViewModal(true);
    }

    const modalClose = () => {
        setModalID(undefined);
        setViewModal(false);
    }

    useEffect(()=>{
        fetch('./local-json/traditional-art.json', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            console.log(response)
            return response.json();
        }).then(function(data) {
            JSON.parse(JSON.stringify(data));

            const artFromAPI = data.map(art => {
                return {
                    id: art._id,
                    name: art.name,
                    description: art.description,
                    medium: art.medium,
                    type: art.type,
                    image: art.imagePath
                };
            });

            console.log(artFromAPI.length);
            setArt(artFromAPI);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        setViewArt(art);
    }, [art]);
    
    return (
        <div>
            {!art ? (
                <h2>Welcome to Moulin Rouge</h2>
            ) : (
                <Container>
                    <Row>
                        <>
                            <h1>Traditional Art</h1>

                            {viewArt.map((piece) => (
                                <Col md={4} className="gallery">
                                    <img
                                        onClick={() => modalOpen(piece.id)}
                                        src={piece.image} 
                                        alt={piece.name} 
                                        className='art' 
                                    />

                                    {modalID === piece.id
                                        ? (
                                            
                                                <Modal show={viewModal} onHide={modalClose} id="piece-modal">
                                                    <div className="piece-info">
                                                        <Modal.Header closeButton>
                                                            <h2>{piece.name}</h2>
                                                        </Modal.Header>

                                                        <Modal.Body>
                                                            <div className="modal-body">
                                                                <img
                                                                    src={piece.image} 
                                                                    alt={piece.name} 
                                                                    className='modal-art' 
                                                                />
                                                                <p className="piece-description">{piece.description}</p>
                                                            </div>
                                                        </Modal.Body>

                                                        <Modal.Footer>
                                                            <Button variant="secondary" id='modal-btn' onClick={modalClose}>Close</Button>
                                                        </Modal.Footer>
                                                    </div>                                        
                                                </Modal>
                                            
                                            
                                        )
                                        : ""
                                    }
                                </Col>
                            ))}
                        </>
                    </Row>
                </Container>
            )}
        </div>     
    )
}