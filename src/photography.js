import {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './App.css';

export const Photography = () => {
    const [photo, setPhoto] = useState([]);
    const [viewPhoto, setViewPhoto] = useState(photo);
    const [hoverID, setHoverID] = useState();

    const onHover = (id) => {
        setHoverID(id);
    }

    const onHoverOver = () => {
        setHoverID(undefined);
    };

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
                            <h2>Photography</h2>

                            {viewPhoto.map((piece) => (
                                <Col md={4} className="gallery">                   
                                    <img
                                        onMouseEnter={() => onHover(piece.id)}
                                        onMouseLeave={onHoverOver}
                                        src={piece.image} 
                                        alt={piece.name} 
                                        className='art' 
                                    />
                                    
                                    {hoverID === piece.id
                                        ? (
                                            <div className="piece-info">
                                                <h4>{piece.name}</h4>
                                                <p>{piece.description}</p>
                                                <p>Shot on {piece.camera}</p>
                                            </div>
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