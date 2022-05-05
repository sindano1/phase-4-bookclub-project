import React from "react";
import "./Home.css"
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavCard from "../NavCard/NavCard";

//A Component that represents the first page that a user lands on after logging in
function Home() {
    //Dashboard Content
    const dashHeader = <h1>Welcome [user]!</h1>
    const dashBody = (<Container>
                        <Row>
                            <Col sm={6} md={4}>
                                Books Read
                            </Col>
                            <Col sm={6} md={4}>
                                Authors Read
                            </Col>
                            <Col sm={6} md={4}>
                                Book Clubs
                            </Col>
                        </Row>
                       </Container>)

    //NavCard Content

    //Reading List
    const readingListHeader = (<h1>Reading List</h1>)
    const readingListBody = (<p>Search for books and see your reading activity.</p>)
    const readingListButton = "My Reading List"
    const readingListLink = "reading-list"

    //Book Clubs
    const bookClubHeader = (<h1>Book Clubs</h1>)
    const bookClubBody = (<p>View, find and join book clubs.</p>)
    const bookClubButton = "My Book Clubs"
    const bookClubLink = "book-club"

    return(
        <>
        <DashboardContainer header={dashHeader} body={dashBody}/>
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <NavCard id="my-reading-list" 
                             header={readingListHeader}
                             body={readingListBody}
                             navButton={readingListButton}
                             navLink={readingListLink}/>
                </Col>
                <Col sm={12} md={6}>
                    <NavCard id="my-book-clubs" 
                             header={bookClubHeader}
                             body={bookClubBody}
                             navButton={bookClubButton}
                             navLink={bookClubLink}/>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;