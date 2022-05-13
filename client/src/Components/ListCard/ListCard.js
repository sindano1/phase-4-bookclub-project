import React, { useState } from "react";
import "./ListCard.css";
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import StartReadingButton from "../StartReadingButton/StartReadingButton";
import FinishReadingButton from "../FinishReadingButton/FinishReadingButton";

function ListCard({bookObject, handleRemoveBookFromLibrary, userLibrary, setUserLibrary}) {
    const [showEditModal, setShowEditModal] = useState(false);

    const readsId = bookObject.reads[0].id;

    function handleCloseEditModal(){
        setShowEditModal(false);
    }
    function handleDeleteBook(){
        console.log(bookObject.reads[0].id)
        handleRemoveBookFromLibrary(bookObject);
        handleCloseEditModal();
    }
 

    return(
        <>
        <div className="list-card" onClick={()=> setShowEditModal(true)}>
            <Container>
                <Row>
                    <Col sm={12} md={3}>
                        <div className="image-container image-small" style={{backgroundImage: `url(${bookObject.image === "" ? 'https://visionsinmethodology.org/wp-content/uploads/2020/06/book-cover-generic.png' : bookObject.image}`}}>
                        </div>
                    </Col>
                    <Col sm={12} md={9}>
                        <div>
                            <p style={{fontSize: "20px", fontWeight: "bold"}}>{bookObject.title}</p>
                            <p>By {bookObject.author}</p>
                            <Container>
                                <Row>
                                    <Col>
                                        {/* Conditionally Render Buttons */}
                                        {bookObject.reads[0].currently_reading ? 
                                            <FinishReadingButton readsId = {readsId} userLibrary= {userLibrary} setUserLibrary={setUserLibrary} bookObject={bookObject}/>
                                            : <StartReadingButton readsId = {readsId} userLibrary= {userLibrary} setUserLibrary={setUserLibrary} bookObject={bookObject}/>
                                        }
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
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
        <Modal className="modal-background" show={showEditModal} onHide={handleCloseEditModal} fullscreen>
            <Modal.Header closeButton>
                <Modal.Title><strong style={{fontSize: "40px"}}>{bookObject.title}</strong> by {bookObject.author}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="book-modal-container">
                    <Row>
                        <Col className="create-update">
                            <p><strong>Added on: {bookObject.created_at}</strong></p>
                        </Col>
                        <Col className="create-update">
                            <p><strong>Updated on: {bookObject.updated_at}</strong></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={3}>
                            <div className="large-image-container" style={{backgroundImage: `url(${bookObject.image === "" ? 'https://visionsinmethodology.org/wp-content/uploads/2020/06/book-cover-generic.png' : bookObject.image}`}}>
                            </div>
                        </Col>

                        <Col sm={12} md={9}>
                            <Row className="info-row">
                                <Col lg={3} style={{borderRight: "2px black solid"}}>
                                    <p><strong>My Rating: </strong></p>
                                    <p><strong>Book Status: </strong></p>
                                </Col>
                                
                                <Col lg={9}>
                                    <p>Books Summary:</p>
                                    <p>Some book summary here.</p>
                                    
                                    <p>My Review</p>
                                    <p>My review of the book here.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p> All Reviews: </p>
                                </Col>
                                
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary">Begin Reading/Finish Reading</Button>
                <Button variant="warning">Favorite</Button>
                <Button variant="danger" onClick={handleDeleteBook}>Remove from My Library</Button>
                <Button variant="secondary" onClick={() => handleCloseEditModal()}>Cancel</Button>

            </Modal.Footer>
            
        </Modal>
        </>
    )
}

export default ListCard;