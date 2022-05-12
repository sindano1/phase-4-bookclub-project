import React, { useState } from 'react'
import './ResultsCard.css'
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
            <Container>
                <Row>
                    <Col md={3} >
                        <div className="results-image-container" style={{backgroundImage: `url(${book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg` : ""}`}}>
                            {!book.isbn ?  <p>"Book Cover Unavailable"</p> : null}
                        </div>
                    </Col>
                    <Col md={6} className="relative">
                        <div className="absolute-center">
                            <p><strong>{book.title}</strong></p>
                            <p>by {book.author_name === undefined ? "No author name available" : book.author_name[0]}</p>
                        </div>
                    </Col>
                    <Col md={3} className="relative">
                    {toggleAdd ? 
                        (<Button variant="primary" name={book.key} onClick={handleAddToList} className="absolute-center">Add Book</Button>)
                         : 
                        (<Button variant="secondary" name={book.key} onClick={handleRemoveFromList} className="absolute-center">Remove Book</Button>)
                    }
                    </Col>

                </Row>
            </Container>
           
            
            
        </article>
    )


}
export default ResultsCard