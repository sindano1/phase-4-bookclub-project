import Button from "react-bootstrap/Button";

function MoveToDeckButton({readsId, userLibrary, setUserLibrary, handleCloseEditModal}){
    function handleMoveToDeck(e){
        e.stopPropagation();
        const configObj = {
            method: "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepted" : "application/json"
            },
            body: JSON.stringify({
                on_deck : true,
                currently_reading : false
            })
        }
        fetch(`/reads/${readsId}`, configObj)
        .then(res => res.json())
        .then(()=>{
            setUserLibrary(userLibrary.map(book => {
                if(book.reads[0].id === readsId){
                    const updatedReads = {...book.reads[0], currently_reading : false, on_deck : true}
                    const updatedBookOjbect = {
                        ...book, reads : [updatedReads]
                    }
                    return updatedBookOjbect
                }else{
                    return book;
                }
            }
        ))

        if(handleCloseEditModal !== undefined){
            console.log(handleCloseEditModal);
            handleCloseEditModal();
        }
        
    })
    }
    return(
        <Button onClick={handleMoveToDeck}>Move to On Deck</Button>
    )
}

export default MoveToDeckButton;