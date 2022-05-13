import Button from "react-bootstrap/Button";

function RateButton({readsId, userLibrary, setUserLibrary, handleCloseEditModal, isRating, setIsRating}){
    function handleRateBook(e){
       setIsRating(true)
    }
    return(
        <Button onClick={handleRateBook}>Rate Book</Button>
    )
}

export default RateButton;