import Button from "react-bootstrap/Button";

function FinishReadingButton({readsId, userLibrary, setUserLibrary, bookObject}){
    function handleStartReading(e){
        e.stopPropagation();
        const configObj = {
            method: "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepted" : "application/json"
            },
            body: JSON.stringify({
                has_been_read : true,
                currently_reading : false
            })
        }
        fetch(`/reads/${readsId}`, configObj)
        .then(res => res.json())
        .then(()=>setUserLibrary(userLibrary.map(book => {
            if(book.reads[0].id === readsId){
                const updatedReads = {...book.reads[0], has_been_read : true, currently_reading : false}
                const updatedBookOjbect = {
                    ...book, reads : [updatedReads]
                }
                return updatedBookOjbect
            }else{
                return book;
            }
        })))
    }
    return(
        <Button onClick={handleStartReading}>Mark as Finished</Button>
    )
}

export default FinishReadingButton;