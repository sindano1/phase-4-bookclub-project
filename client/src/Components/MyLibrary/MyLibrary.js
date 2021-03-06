import React, { useState, useContext} from "react";
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import useRetrieveUserBooks from "../../CustomHooks/useRetrieveUserBooks";
import "./MyLibrary.css";
import { Link } from "react-router-dom";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import ListCard from "../ListCard/ListCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ResultsCard from '../ResultsCard/ResultsCard';
import SmallList from "../SmallList/SmallList";


function MyLibrary() {
    const { user, userLibrary, setUserLibrary } = useContext(UserContext);
        //Retrieve user if logged in
    useLoginState();
    //Retrieve a user's books if logged in
    useRetrieveUserBooks();

    const [newBookFormState, setNewBookFormState] = useState("");
    //Two separate modal states: one for the modal that pops up when the user searches a book
    //One that pops up when the user chooses to manually enter a book
    const [showModal, setShowModal] = useState(false);
    const [showManualModal, setShowManualModal] = useState(false);

    const [searchData, setSearchData] = useState([]);
    const [manualBookForm, setManualBookForm] = useState({
        "title" : "",
        "author" : "",
        "genre" : "",
        "image": ""
    });
    const { title, author, genre, image } = manualBookForm;
    const [addBook, setAddBook] = useState([])

    //Jumbotron Content
    const dashHeader = <h1>{user.username}'s Library</h1>
    const dashBody = (
        <>
            <h2>Track your books. Find new adventures. Leave reviews.</h2>
            {/* Add another page for manual book entry that does not use the API and allows a user to input title, author and an image. */}
            <Form onSubmit={handleNewBookSubmission}>
                <Form.Label>Search for books to add to your reading list. Can't find your book? Add one manually <span onClick={handleManualBookSubmission} id="manual-book" style={{textDecoration:"underline"}}>here</span>.</Form.Label>
                <Form.Control type="text" name="booksearch" value={newBookFormState} onChange={handleFormChange} placeholder="Search for a book title, author or genre"></Form.Control>
            </Form>
        </>
    )
    const dashboardId = "my-library-jumbo"

    //This is a function that handles change in user input text
    function handleFormChange(e) {
        setNewBookFormState(e.target.value)
    }
    //This is a function that handles showing/hiding the search results modal
    function handleClose() {
        setShowModal(false);
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
    function handleManualModalClose(){
        setManualBookForm({
            "title" : "",
            "author" : "",
            "genre" : "",
            "image": ""
        })
        setShowManualModal(false);
    }

    //This function only opens the manula book modal
    function handleManualBookSubmission(){
        setShowManualModal(true);
    }

    function handleManualFormChange(e){
        console.log(e.target.name)
        setManualBookForm({...manualBookForm, [e.target.name] : e.target.value})
    }

    //This function handles posting a book manually
    function handleManualBookPost(e){
        e.preventDefault();
        //Make a post to the database
        console.log(manualBookForm)

        const configObj = {
            method: "POST", 
            headers : {
                "Content-Type" : "application/json",
                "Accepted" : "application/json"
            },
            body : JSON.stringify(manualBookForm)
        }

        fetch("/store-books", configObj)
        .then(res => {
            if (res.ok){
                //Currently the data that is being returned is not serialized the way I want it to. CHANGE THIS!
                res.json().then( addedBook => setUserLibrary([...userLibrary, addedBook]))
            }else{
                console.log("Oops. Something went wrong.")
            }
        })

        setManualBookForm({
            "title" : "",
            "author" : "",
            "genre" : "",
            "image": ""
        })
        setShowManualModal(false);
    }

    //This is a function that handles when the user submits their search query
    function handleNewBookSubmission(e) {
        e.preventDefault();
        setAddBook([]);
        //Take the form value from the state
        //Split the string, add + to add into the fetch request
        const parsedValue = newBookFormState.split(" ");
        console.log("ParsedValue", parsedValue);

        //May need to remove the "+" from the last word in the array
        const formattedValue = parsedValue.map(word => word + "+");
        console.log("FormattedValue", formattedValue);

        const queryString = formattedValue.join('');
        console.log("Query String", queryString);

        //Make the fetch request
        fetch(`http://openlibrary.org/search.json?q=${queryString}`)
            // Maybe add some error handling here
            .then(res => res.json())
            .then(searchData => {
                setShowModal(true);
                setSearchData(searchData);

            })
    };
 
    function handleStoreBooks(addBookArray) {
        addBook.forEach(bookObj => {
            fetch(`/store-books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(
                    bookObj
                )
            })
            .then(res => res.json())
            .then(addedBook => {
                setUserLibrary([...userLibrary, addedBook]);
            })
            .catch(error => console.log(error.message));

            setShowModal(false);
        })
        }

    function renderSearchData() {
        // console.log(searchData)
        // This if is to prevent the empty state array from erroring the render
        if (searchData.length === 0) {
            // The return here has not loaded
            return <p>Loading...</p>
        } else {
            // Map through the first 10 results to return cover art, title, author
            const mappedResults = searchData.docs.slice(0, 10).map(book => {
                return <ResultsCard book = {book} addBook = {addBook} setAddBook = {setAddBook} handleStoreBooks = {handleStoreBooks}/>
            }
            )
            // Preventing errors
            if (mappedResults === undefined) {
                return <p>Loading...</p>
            } else {
                return mappedResults;
            }
        }
    }

    let booksOnDeck = userLibrary.filter(bookObject => bookObject.reads && bookObject.reads[0].on_deck === true ? bookObject : false)
    let currentlyReadingBooks = userLibrary.filter(bookObject => bookObject.reads && bookObject.reads[0].currently_reading === true ? bookObject : false)
    let readBooks = userLibrary.filter(bookObject => bookObject.reads && bookObject.reads[0].has_been_read === true ? bookObject : false)
    let favoriteBooks = userLibrary.filter(bookObject => bookObject.reads && bookObject.reads[0].is_favorite === true ? bookObject : false)
    // At some point we will map over a user's unread books, read books and reviews
    const mappedBooksOnDeck = booksOnDeck.map(bookObject => <ListCard key={bookObject.reads[0].key} handleRemoveBookFromLibrary={handleRemoveBookFromLibrary} bookObject={bookObject} userLibrary={userLibrary} setUserLibrary={setUserLibrary}/>);
    const mappedCurrentlyReadingBooks = currentlyReadingBooks.map(bookObject => <ListCard key={bookObject.reads[0].key} handleRemoveBookFromLibrary={handleRemoveBookFromLibrary} bookObject={bookObject} userLibrary={userLibrary} setUserLibrary={setUserLibrary}/>);
    const mappedReadBooks = readBooks.map(bookObject => <SmallList bookObject={bookObject}/>)
    const mappedFavorites = favoriteBooks.map(bookObject => <SmallList bookObject={bookObject}/>);

    return (
        <>
            <DashboardContainer header={dashHeader} body={dashBody} id={dashboardId} />
            {/* When a user searches for a book, they should see a dropdown menu with a list of books. Each div in the dropdown should have a button that says "add book".
        Clicking on the book will add it to the "Reading List" */}
            <Container>
                <Row>
                    <Col sm={12} md={8}>
                        <section className="content-list">
                            <header>
                                <h3><strong>My Reading List</strong></h3>
                            </header>
                            <hr />
                            <section>
                                <section>
                                    <header>
                                        <h4>Currently Reading</h4>
                                    </header>
                                    {mappedCurrentlyReadingBooks.length === 0 ? <p className="empty-array-msg">You are not currently reading any books.</p> : <ol>{mappedCurrentlyReadingBooks}</ol>}
                                </section>
                                <hr />
                                <header>
                                    <h4>On Deck</h4>
                                </header>
                                <section>
                                    {mappedBooksOnDeck.length === 0 ? <p className="empty-array-msg">You have no books in your reading list.</p> : <ol>{mappedBooksOnDeck}</ol>}
                                </section>
                            </section>

                        </section>
                    </Col>
                    <Col sm={12} md={4}>
                        <section className="content-list border" id="past-book-reviews">
                            <header>
                                <h3><strong>Past Books and Favorites</strong></h3>
                            </header>
                            <hr />
                            <section>
                                <header>
                                    <h4>Read Books</h4>
                                </header>
                                <hr />
                                {mappedReadBooks.length === 0 ? <p className="empty-array-msg">You haven't read any books.</p> : <ol>{mappedReadBooks}</ol>}
                            </section>
                            <section>
                                <header>
                                    <h4>Favorites</h4>
                                </header>
                                <hr />
                                {mappedFavorites.length === 0 ? <p className="empty-array-msg">You don't have any favorites.</p> : <ol>{mappedFavorites}</ol>}
                            </section>
                        </section>
                    </Col>
                </Row>
            </Container>

            {/* Book API Search Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Results for: <strong>{newBookFormState}</strong></Modal.Title>
                </Modal.Header>

                <Modal.Body id="api-search-modal">
                    {renderSearchData()}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleStoreBooks} >Add Selected Books to Your Reading List</Button>
                </Modal.Footer>
            </Modal>
            
            {/* MANUAL BOOK ENTRY MODAL */}
            <Modal show={showManualModal} onHide={handleManualModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Manual Book Entry:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleManualBookPost}>
                        <Form.Group>
                            <Form.Label>Book Title:</Form.Label>
                            <Form.Control required type="text" name="title" value={title} onChange={handleManualFormChange} placeholder="Book Title"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Author:</Form.Label>
                            <Form.Control required type="text" name="author" value={author} onChange={handleManualFormChange} placeholder="Author"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre (optional):</Form.Label>
                            <Form.Control type="text" name="genre" value={genre} onChange={handleManualFormChange} placeholder="Genre"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image URL (optional):</Form.Label>
                            <Form.Control type="text" name="image" value={image} onChange={handleManualFormChange} placeholder="Image"></Form.Control>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleManualModalClose}>Cancel</Button>
                            <Button variant="primary" type="submit" >Add Book</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default MyLibrary;