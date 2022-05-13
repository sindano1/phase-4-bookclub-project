import React, { useState } from "react";
import Form from "react-bootstrap/Form"

function BookRatingForm({readsId, isRating, setIsRating, bookObject, userLibrary, setUserLibrary}){
    const [bookRatingForm, setBookRatingForm] = useState(null)
    function handleRatingChange(e){
        setBookRatingForm(e.target.value);
    }
    function handleBookRating(bookRating){
        const configObj = {
            method: "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepted" : "application/json"
            },
            body: JSON.stringify({
                rating : bookRating
            })
        }
        fetch(`/reads/${readsId}`, configObj)
        .then(res => res.json())
        .then(()=>{
            
            setUserLibrary(userLibrary.map(book => {
                if(book.reads[0].id === readsId){
                    const updatedReads = {...book.reads[0], rating : bookRating}
                    const updatedBookOjbect = {
                        ...book, reads : [updatedReads]
                    }
                    return updatedBookOjbect
                }else{
                    return book;
                }
            }))
            
            setIsRating(false);
    })
    }
    return(
        <Form onSubmit={()=>handleBookRating(bookRatingForm)}>
            <Form.Group>
                <Form.Label>Rating /10</Form.Label>
                <Form.Control type="number" name="rating" value={bookRatingForm} onChange={handleRatingChange}/> 
            </Form.Group>
        </Form>
    )
}

export default BookRatingForm;