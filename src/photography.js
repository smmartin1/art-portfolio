import {useState, useEffect} from 'react';
import { Container, Row, Col, Modal, Button  } from 'react-bootstrap';

import './App.css';

export const Photography = () => {
    const [photo, setPhoto] = useState([]);
    const [viewPhoto, setViewPhoto] = useState(photo);
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
        fetch('./local-json/photography.json', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            console.log(response)
            return response.json();
        }).then(function(data) {
            JSON.parse(JSON.stringify(data));

            const photoFromAPI = data.map(photo => {
                return {
                    id: photo._id,
                    name: photo.name,
                    description: photo.description,
                    camera: photo.camera,
                    type: photo.type,
                    image: photo.imagePath
                };
            });

            console.log(photoFromAPI.length);
            console.log(photoFromAPI);
            setPhoto(photoFromAPI);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        setViewPhoto(photo);
    }, [photo]);

    return (
        <div>
            {!photo ? (
                <h2>Welcome to Moulin Rouge</h2>
            ) : (
                <Container>
                    <Row>
                        <>
                            <h1>Photography</h1>

                            {viewPhoto.map((piece) => (
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
                                                            <p className="piece-description">{piece.description}<br />Shot on {piece.camera}</p>         
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