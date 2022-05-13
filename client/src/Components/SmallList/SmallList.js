import React, {useState, useContext} from "react";
import "./SmallList.css"
import BookModal from "../Modals/BookModal/BookModal";
import { UserContext } from "../UserContext/UserContext";



function SmallList({bookObject}){
    const [showEditModal, setShowEditModal] = useState(false);
    const {userLibrary, setUserLibrary} = useContext(UserContext);

    function handleCloseEditModal(){
        setShowEditModal(false);
    }

    function handleDeleteBook(){
        console.log(bookObject.reads[0].id)
        handleRemoveBookFromLibrary(bookObject);
        handleCloseEditModal();
    }

    const bookStatus = (bookObject) => {
        if(bookObject.reads[0].currently_reading === true){
            return "Currently Reading"
        }else if (bookObject.reads[0].on_deck === true){
            return "On Deck"
        }else if (bookObject.reads[0].has_been_read === true ){
            return "Read"
        }
    }

    function handleRemoveBookFromLibrary(bookObject){
        console.log(bookObject.reads[0].id)

        const configObj = {
            method : "DELETE"
        }
        fetch(`/reads/${bookObject.reads[0].id}`, configObj)
        .then(res => res.json())
        .then(
            setUserLibrary(prev => prev.filter(stateObject => stateObject.reads[0].id !== bookObject.reads[0].id))
        )
        .catch(error => console.log(error.message))
    }

    return(
        <>
            <li onClick={()=> setShowEditModal(true)} className="read-books-list" key={bookObject.reads[0].key}><strong>{bookObject.title}</strong> by {bookObject.author}</li>
            <BookModal showEditModal={showEditModal} 
                   setShowEditModal={setShowEditModal}
                   bookObject={bookObject}
                   bookStatus = {bookStatus}
                   handleDeleteBook={handleDeleteBook}
                   handleCloseEditModal={handleCloseEditModal}/>
        </>
    )
}

export default SmallList;