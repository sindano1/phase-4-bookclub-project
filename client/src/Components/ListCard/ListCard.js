import React, { useState } from "react";
import "./ListCard.css";
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import StartReadingButton from "../StartReadingButton/StartReadingButton";
import FinishReadingButton from "../FinishReadingButton/FinishReadingButton";
import BookModal from "../Modals/BookModal/BookModal";


function ListCard({bookObject, handleRemoveBookFromLibrary, userLibrary, setUserLibrary}) {
    const [showEditModal, setShowEditModal] = useState(false);

    const readsId = bookObject.reads[0].id;
    const bookStatus = (bookObject) => {
        if(bookObject.reads[0].currently_reading === true){
            return "Currently Reading"
        }else if (bookObject.reads[0].on_deck === true){
            return "On Deck"
        }else if (bookObject.reads[0].has_been_read === true ){
            return "Read"
        }
    }

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
                            <p style={{fontSize: "20px", fontWeight: "bold"}}>{bookObject.reads[0].is_favorite === true ? <span id="favorite-start-container"><img id="favorite-star" src="https://i.pinimg.com/originals/85/db/23/85db232a0e2f4d7ec93db9bcedeb97d8.png" alt="favorite"/></span> : null} {bookObject.title}</p>
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
        <BookModal showEditModal={showEditModal} 
                   setShowEditModal={setShowEditModal}
                   bookObject={bookObject}
                   bookStatus = {bookStatus}
                   handleDeleteBook={handleDeleteBook}
                   handleCloseEditModal={handleCloseEditModal}/>
        </>
    )
}

export default ListCard;