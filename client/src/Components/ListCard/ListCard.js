import React from "react";
import "./ListCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ListCard({bookObject}) {
    return(
        <>
        <div className="list-card">
            <Container>
                <Row>
                    <Col>
                    <div className="image-container">
                    
                    </div>
                    </Col>
                    <Col>
                        <p style={{fontSize: "20px", fontWeight: "bold"}}>{bookObject.title}</p>
                    </Col>

                    <Col>
                        <p>{bookObject.author}</p>
                    </Col>
                    <Col>
                    <p>{bookObject.genre}</p>
                    </Col>
                </Row>
                
            </Container>
        </div>
        <hr/>
        </>
    )
}

export default ListCard;