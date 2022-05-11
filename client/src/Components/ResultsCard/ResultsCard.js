import React from 'react'
import './ResultsCard.css'
import Button from "react-bootstrap/Button";

function ResultsCard({ book }) {

    // function handleAddToList() {
    //     console.log("add these books")
    //     // Will need conditional rendering for add/remove
    //     // Saves book data in an array of objects
    // }
    //two buttons add/remove (or conditional rendering from add to remove)

    return (
        <article className="results-card">
            <p>{book.title}</p>
            {book.isbn ? <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} alt={book.title} /> : <p>"Book Cover Unavailable"</p>}
            <p>{book.author_name[0]}</p>
            <Button variant="primary">Add Book</Button>
            {/* onClick={handleAddToList} This will create an array of objects with title, author_name, image, and key */}
        </article>
    )


}
export default ResultsCard