import Button from "react-bootstrap/Button";

function FavoriteButton({readsId, userLibrary, setUserLibrary}){
    function markAsFavorite(e){
        e.stopPropagation();
        const configObj = {
            method: "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepted" : "application/json"
            },
            body: JSON.stringify({
                is_favorite : true
            })
        }
        fetch(`/reads/${readsId}`, configObj)
        .then(res => res.json())
        .then(()=>{
            setUserLibrary(userLibrary.map(book => {
                if(book.reads[0].id === readsId){
                    const updatedReads = {...book.reads[0], is_favorite : true}
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
        <Button variant="warning" onClick={markAsFavorite}>Favorite</Button>
    )
}

export default FavoriteButton;