import {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './App.css';

export const Digital = () => {
    const [digital, setDigital] = useState([]);
    const [viewDigital, setViewDigital] = useState(digital);
    const [hoverID, setHoverID] = useState();

    const onHover = (id) => {
        setHoverID(id);
    }

    const onHoverOver = () => {
        setHoverID(undefined);
    };

    useEffect(()=>{
        fetch('./local-json/digital-art.json', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            console.log(response)
            return response.json();
        }).then(function(data) {
            JSON.parse(JSON.stringify(data));

            const digitalFromAPI = data.map(digital => {
                return {
                    id: digital._id,
                    name: digital.name,
                    description: digital.description,
                    software: digital.software,
                    type: digital.type,
                    image: digital.imagePath
                };
            });

            console.log(digitalFromAPI.length);
            console.log(digitalFromAPI);
            setDigital(digitalFromAPI);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        setViewDigital(digital);
    }, [digital])

    return (
        <div>
            {!digital ? (
                <h2>Welcome to Moulin Rouge</h2>
            ) : (
                <Container>
                    <Row>
                        <>
                            <h2>Digital Art</h2>

                            {viewDigital.map((piece) => (
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