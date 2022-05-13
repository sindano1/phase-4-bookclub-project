import React, { useContext, useState } from 'react';
import { UserContext } from "../../UserContext/UserContext"
import "./BookModal.css"
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import FinishReadingButton from '../../FinishReadingButton/FinishReadingButton';
import MoveToDeckButton from '../../MoveToDeckButton/MoveToDeckButton';
import StartReadingButton from '../../StartReadingButton/StartReadingButton';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';
import UnFavoriteButton from '../../FavoriteButton/UnFavoriteButton';
import RateButton from '../../RateButton/RateButton';
import BookRatingForm from '../../BookRatingForm/BookRatingForm';

function BookModal({showEditModal, handleCloseEditModal, bookObject, bookStatus, handleDeleteBook}){
    const { userLibrary, setUserLibrary } = useContext(UserContext)
    const [isRating, setIsRating] = useState(false)

    const bookReads = bookObject.reads[0]
    const ratingBox = ()=>{
        if(bookReads.rating === null){
            return <p style={{fontSize : "20px", margin: "5px", padding: "10px", border: "solid black 1px", textAlign: "center"}}>No Rating</p>;    
        }else{
            return <p style={{fontSize : "20px", margin: "5px", padding: "10px", border: "solid black 1px", textAlign: "center"}}><span style={{fontSize : "50px", fontWeight: "bold", textAlign: "center"}}>{bookObject.reads[0].rating}</span> / 10</p>
        }
    }

    const buttonsArray = ()=>{
        //Depending on the book status, we want to render a different menu of buttons
        //Cancel, Remove, Favorite, Rate & Review from Library will always be there
        //CurrentlyReading: Move back on Deck, Finish reading
        //On Deck: Start Reading
        //Has been read: Move back on Deck, Start Over (move to currently reading)
        if(bookReads.on_deck){

            return [<StartReadingButton readsId={bookReads.id} 
                                        userLibrary ={userLibrary} 
                                        setUserLibrary={setUserLibrary}
                                        handleCloseEditModal={handleCloseEditModal}/>]

        }else if(bookReads.currently_reading){

            return [<MoveToDeckButton readsId={bookReads.id}
                            userLibrary={userLibrary}
                            setUserLibrary={setUserLibrary}
                            handleCloseEditModal={handleCloseEditModal}/>, 
                    <FinishReadingButton readsId={bookReads.id} 
                                         userLibrary ={userLibrary} 
                                         setUserLibrary={setUserLibrary}
                                         handleCloseEditModal={handleCloseEditModal}/>]

        }else if(bookReads.has_been_read && !bookReads.on_deck && !bookReads.currently_reading){
            return [<MoveToDeckButton readsId={bookReads.id}
                                      userLibrary={userLibrary}
                                      setUserLibrary={setUserLibrary}
                                      handleCloseEditModal={handleCloseEditModal}/>,
                    <StartReadingButton readsId={bookReads.id} 
                                         userLibrary ={userLibrary} 
                                         setUserLibrary={setUserLibrary}
                                         handleCloseEditModal={handleCloseEditModal}/>,
                    <RateButton isRating={isRating}
                                setIsRating={setIsRating}/>]
        }
    }

    const mappedButtonsArray = buttonsArray().map((button, index)=>{return <span key={index}>{button}</span>})
    
    return(
    
       <Modal className="modal-background" show={showEditModal} onHide={handleCloseEditModal} fullscreen>
       <Modal.Header closeButton>
           <Modal.Title>
               <strong style={{fontSize: "40px"}}>
                    {bookReads.is_favorite === true ? <span id="favorite-start-container"><img id="favorite-star" src="https://i.pinimg.com/originals/85/db/23/85db232a0e2f4d7ec93db9bcedeb97d8.png" alt="favorite"/></span> : null}

                   {bookObject.title}
               </strong> by {bookObject.author}</Modal.Title>
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
                               <p style={{textAlign: "center", marginBottom: "0", marginTop: "20px"}}>Your Rating:</p>
                               {/* Add the rating here */}
                               {ratingBox()}
                               {isRating ? <BookRatingForm readsId={bookReads.id} bookObject={bookObject} userLibrary={userLibrary} setUserLibrary={setUserLibrary} isRating={isRating} setIsRating={setIsRating}/>: null}
                               <p style={{fontStyle:"italic", textAlign: "center"}}><strong>{bookStatus(bookObject)}</strong></p>                               
                           </Col>
                           
                           <Col lg={9}>
                               <p>Books Summary:</p>
                               <p>Some book summary here.</p>
                               
                               <p>My Review</p>
                               <p>My review of the book here.</p>
                           </Col>
                       </Row>
                   </Col>
               </Row>
           </Container>
       </Modal.Body>
       <Modal.Footer>
                {mappedButtonsArray}
                {bookReads.is_favorite === true ? <UnFavoriteButton readsId={bookReads.id} 
                                         userLibrary ={userLibrary} 
                                         setUserLibrary={setUserLibrary}/> : <FavoriteButton readsId={bookReads.id} 
                                                                                               userLibrary ={userLibrary} 
                                                                                               setUserLibrary={setUserLibrary}/>}
                <Button variant="danger" onClick={handleDeleteBook}>Remove from My Library</Button>
                <Button variant="secondary" onClick={() => handleCloseEditModal()}>Cancel</Button>

            </Modal.Footer>
            
        </Modal>
    
    )
}

export default BookModal;