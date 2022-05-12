import React, { useState } from "react";
import "./ListCard.css";
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function ListCard({bookObject}) {
    const [showEditModal, setshowEditModal] = useState(false);

    function handleCloseEditModal(){
        setshowEditModal(false);
    }

    return(
        <>
        <div className="list-card" onClick={()=> setshowEditModal(true)}>
            <Container>
                <Row>
                    <Col sm={6} md={2}>
                        <div className="image-container image-small" style={{backgroundImage: `url(${bookObject.image === "" ? 'https://visionsinmethodology.org/wp-content/uploads/2020/06/book-cover-generic.png' : bookObject.image}`}}>
                        </div>
                    </Col>
                    <Col className="relative" sm={6} md={4}>
                        <p className="absolute-center" style={{fontSize: "20px", fontWeight: "bold"}}>{bookObject.title}</p>
                    </Col>

                    <Col className="relative" sm={6} md={3}>
                        <p className="absolute-center">By {bookObject.author}</p>
                    </Col>
                    <Col className="relative" sm={6} md={3}>
                        <p className="absolute-center"> Genre: {bookObject.genre}</p>
                    </Col>
                </Row>
            </Container>
            <hr/>
            <Container>
                <Row>
                    <Col>
                        <p style={{fontSize : "10px", margin: "0"}}><strong>Added on:</strong> {bookObject.created_at}</p>
                    </Col>
                    <Col>
                        <p style={{fontSize : "10px", margin: "0"}}><strong>Updated on:</strong> {bookObject.updated_at}</p>
                    </Col>
                </Row>
            </Container>
        </div>
        <hr/>
        {/* EDIT BOOK MODAL */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} fullscreen>
            <Modal.Header closeButton>
                <Modal.Title><span>{bookObject.title}</span> by <span>{bookObject.author} </span></Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col sm={12} md={3}>
                            <div className="large-image-container" style={{backgroundImage: `url(${bookObject.image === "" ? 'https://visionsinmethodology.org/wp-content/uploads/2020/06/book-cover-generic.png' : bookObject.image}`}}>
                            </div>
                        </Col>

                        <Col sm={12} md={9}>
                            <Row>
                                <Col>
                                    <p><strong>Book Status: </strong> [Book status here]</p>
                                </Col>
                                <Col>
                                    <p>Conditional button rendering: start reading, finished reading, put back on deck</p>
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
    
                    <Row>
                        <Col>
                            <p><strong>Added on: {bookObject.created_at}</strong></p>
                        </Col>
                        <Col>
                            <p><strong>Updated on: {bookObject.updated_at}</strong></p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Save Changes</Button>
                <Button variant="danger">Delete Book</Button>
                <Button variant="secondary">Cancel</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ListCard;