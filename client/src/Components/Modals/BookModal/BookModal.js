import React from 'react';
import "./BookModal.css"
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function BookModal({showEditModal, handleCloseEditModal, bookObject, bookStatus, handleDeleteBook}){
    return(
    
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
                           <Col lg={3} id="border-sep">
                               {/* Add the rating here */}
                               <p style={{fontSize : "20px", margin: "5px", padding: "10px", border: "solid black 1px"}}><span style={{fontSize : "50px", fontWeight: "bold", textAlign: "center"}}>  10</span> / 10</p>
                               <p style={{fontStyle:"italic", textAlign: "center"}}><strong>{bookStatus(bookObject)}</strong></p>
                               
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
    
    )
}

export default BookModal;