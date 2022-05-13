import Button from "react-bootstrap/Button";

function StartReadingButton({readsId, userLibrary, setUserLibrary, handleCloseEditModal}){
    function handleStartReading(e){
        e.stopPropagation();
        const configObj = {
            method: "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepted" : "application/json"
            },
            body: JSON.stringify({
                currently_reading : true,
                on_deck : false
            })
        }
        fetch(`/reads/${readsId}`, configObj)
        .then(res => res.json())
        .then(()=>{
            
            setUserLibrary(userLibrary.map(book => {
                if(book.reads[0].id === readsId){
                    const updatedReads = {...book.reads[0], currently_reading : true, on_deck : false}
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
        <Button onClick={handleStartReading}>Start Reading</Button>
    )
}

export default StartReadingButton;