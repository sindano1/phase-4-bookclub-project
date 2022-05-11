import React, { useState, useContext} from "react";
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import "./MyLibrary.css";
import { Link } from "react-router-dom";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ResultsCard from '../ResultsCard/ResultsCard';

function MyLibrary() {
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    useLoginState();
    const [newBookFormState, setNewBookFormState] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [searchData, setSearchData] = useState([]);

    //Jumbotron Content
    const dashHeader = <h1>{user.username}'s Library</h1>
    const dashBody = (
        <>
            <h2>Track your books. Find new adventures. Leave reviews.</h2>
            {/* Add another page for manual book entry that does not use the API and allows a user to input title, author and an image. */}
            <Form onSubmit={handleNewBookSubmission}>
                <Form.Label>Search for books to add to your reading list. Can't find your book? Add one manually <Link to="/">here</Link>.</Form.Label>
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
    //This is a function that handles when the user submits their search query
    function handleNewBookSubmission(e) {
        e.preventDefault();
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

    function renderSearchData() {
        // This if is to prevent the empty state array from erroring the render
        if (searchData.length === 0) {
            // The return here has not loaded
            return <p>Loading...</p>
        } else {
            // Map through the first 10 results to return cover art, title, author
            const mappedResults = searchData.docs.slice(0, 10).map(book => {
                return <ResultsCard book = {book}/>
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


    // At some point we will map over a user's unread books, read books and reviews
    const mappedUnreadBooks = [];
    const mappedCurrentlyReadingBOoks = [];
    const mappedReadBooks = [];
    const mappedReviews = [];

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
                                    {mappedCurrentlyReadingBOoks.length === 0 ? <p className="empty-array=msg">You are not currently reading any books.</p> : <ol>{mappedCurrentlyReadingBOoks}</ol>}
                                </section>
                                <hr />
                                <header>
                                    <h4>On Deck</h4>
                                </header>
                                <section>
                                    {mappedUnreadBooks.length === 0 ? <p className="empty-array-msg">You have no books in your reading list.</p> : <ol>{mappedUnreadBooks}</ol>}
                                </section>
                            </section>

                        </section>
                    </Col>
                    <Col sm={12} md={4}>
                        <section className="content-list border" id="past-book-reviews">
                            <header>
                                <h3><strong>Past Books and Reviews</strong></h3>
                                {/* Build a new page for this. Currently linking to home */}
                                <Link to="/">See All</Link>
                            </header>
                            <hr />
                            <section>
                                <header>
                                    <h4>Recently Read</h4>
                                </header>
                                <hr />
                                {mappedReadBooks.length === 0 ? <p className="empty-array-msg">You haven't read any books.</p> : <ol>{mappedReadBooks}</ol>}
                            </section>
                            <section>
                                <header>
                                    <h4>Recent Reviews</h4>
                                </header>
                                <hr />
                                {mappedReviews.length === 0 ? <p className="empty-array-msg">You haven't written any reviews.</p> : <ol>{mappedReviews}</ol>}
                            </section>
                        </section>
                    </Col>
                </Row>
            </Container>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {renderSearchData()}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" >Save changes</Button>
                    {/* onClick={handleAddReads} */}
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default MyLibrary;