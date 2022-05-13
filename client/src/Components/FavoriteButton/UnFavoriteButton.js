import Button from "react-bootstrap/Button";

function UnFavoriteButton({readsId, userLibrary, setUserLibrary}){
    function removeFromFavorites(e){
        e.stopPropagation();
        const configObj = {
            method: "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepted" : "application/json"
            },
            body: JSON.stringify({
                is_favorite : false
            })
        }
        fetch(`/reads/${readsId}`, configObj)
        .then(res => res.json())
        .then(()=>{
            setUserLibrary(userLibrary.map(book => {
                if(book.reads[0].id === readsId){
                    const updatedReads = {...book.reads[0], is_favorite : false}
                    const updatedBookOjbect = {
                        ...book, reads : [updatedReads]
                    }
                    return updatedBookOjbect
                }else{
                    return book;
                }
            }
        ))
    })
    }
    return(
        <Button variant="secondary" onClick={removeFromFavorites}>UnFavorite</Button>
    )
}

export default UnFavoriteButton;