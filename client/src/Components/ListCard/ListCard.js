import React, { useState } from "react";
import "./ListCard.css";
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
                        <div className="image-container" style={{backgroundImage: `url(${bookObject.image === "" ? 'https://visionsinmethodology.org/wp-content/uploads/2020/06/book-cover-generic.png' : bookObject.image}`}}>
                        </div>
                    </Col>
                    <Col sm={6} md={4}>
                        <p style={{fontSize: "20px", fontWeight: "bold"}}>{bookObject.title}</p>
                    </Col>

                    <Col sm={6} md={3}>
                        <p>By {bookObject.author}</p>
                    </Col>
                    <Col sm={6} md={3}>
                        <p> Genre: {bookObject.genre}</p>
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
                <Modal.Title>[Book Name]</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    
            </Modal.Body>
        </Modal>
        </>
    )
}

export default ListCard;