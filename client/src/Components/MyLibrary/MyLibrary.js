import React, { useState } from "react";
import "./MyLibrary.css";
import { Link } from "react-router-dom";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'

function MyLibrary(){

    const dashHeader = <h1>Library</h1>
    const dashBody = (
        <>
            <h2>Track your books. Find new adventures. Leave reviews.</h2>
            {/* Add another page for manual book entry that does not use the API and allows a user to input title, author and an image. */}
            <Form>
                <Form.Label>Add books to your reading list. Can't find your book? Add one manually <Link to="/">here</Link>.</Form.Label>
                <Form.Control type="text" placeholder="Search for a book title, author or genre"></Form.Control>
            </Form>
        </>
    )

    // At some point we will map over a user's unread books, read books and reviews
    const mappedUnreadBooks = [];
    const mappedCurrentlyReadingBOoks = [];
    const mappedReadBooks = [];
    const mappedReviews = [];
    
    return(
        <>
        <DashboardContainer header={dashHeader} body={dashBody}/>
        {/* When a user searches for a book, they should see a dropdown menu with a list of books. Each div in the dropdown should have a button that says "add book".
        Clicking on the book will add it to the "Reading List" */}
        <Container>
            <Row>
                <Col sm={12} md={8}>
                    <section className="content-list">
                        <header>
                            <h3>My Reading List</h3>
                        </header>
                        <hr/>
                        <section>
                            <section>
                                <header>
                                    <h4>Currently Reading</h4>
                                </header>
                                {mappedCurrentlyReadingBOoks.length === 0 ? <p className="empty-array=msg">You are not currently reading any books.</p> : <ol>{mappedCurrentlyReadingBOoks}</ol>}
                            </section>
                            <hr/>
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
                    <section className="content-list">
                        <header>
                            <h3>Past Books and Reviews</h3>
                            {/* Build a new page for this. Currently linking to home */}
                            <Link to="/">See All</Link>
                        </header>
                        <hr/>
                        <section>
                            <header>
                                <h4>Recently Read</h4>
                            </header>
                            <hr/>
                            {mappedReadBooks.length === 0 ? <p className="empty-array-msg">You haven't read any books.</p> : <ol>{mappedReadBooks}</ol>}
                        </section>
                        <section>
                            <header>
                                <h4>Recent Reviews</h4>
                            </header>
                            <hr/>
                            {mappedReviews.length === 0 ? <p className="empty-array-msg">You haven't written any reviews.</p> : <ol>{mappedReviews}</ol>}
                        </section>
                    </section>
                </Col>
            </Row>
        </Container>

        </>
    )
}

export default MyLibrary;