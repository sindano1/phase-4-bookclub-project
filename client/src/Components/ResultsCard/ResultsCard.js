import React from 'react'
import './ResultsCard.css'
import Button from "react-bootstrap/Button";
import { useState } from 'react'

function ResultsCard({ book, addBook, setAddBook, handleStoreBooks }) {

    // button toggle
    const [toggleAdd, setToggleAdd] = useState(true)

    function handleToggleAdd() {
        setToggleAdd((toggleAdd) => !toggleAdd);
    }

    // Saves book data in an array of objects
    function handleAddToList(e) {
        setAddBook([...addBook, {
            title: book.title,
            author: book.author_name[0],
            image: book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg` : "",
            key: book.key
        }])
        handleToggleAdd()
    }

    // filter addBook array so that we return the objects that do NOT match the key (e.target.name) and sets State
    function handleRemoveFromList(e) {
        const filteredBooks = addBook.filter(bookObj => bookObj.key !== e.target.name)
        setAddBook(filteredBooks)
        handleToggleAdd()
    }

    return (
        <article className="results-card">
            <p>{book.title}</p>
            {book.isbn ? <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} alt={book.title} /> : <p>"Book Cover Unavailable"</p>}
            <p>{book.author_name === undefined ? "No author name available" : book.author_name[0]}</p>
            {toggleAdd ? (
                <Button variant="primary" name={book.key} onClick={handleAddToList}>Add Book</Button>
            ) : (
                <Button variant="primary" name={book.key} onClick={handleRemoveFromList}>Remove Book</Button>
            )}
        </article>
    )


}
export default ResultsCard