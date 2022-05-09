import React, { useEffect } from "react";
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
    const readingListHeader = (<h1>My Library</h1>)
    const readingListBody = (<p>See your current and past books and reviews. Add new books. W</p>)
    const readingListButton = "Go to Your Library"
    const readingListLink = "mylibrary"

    //Book Clubs
    const bookClubHeader = (<h1>Book Clubs</h1>)
    const bookClubBody = (<p>View, find and join book clubs.</p>)
    const bookClubButton = "My Book Clubs"
    const bookClubLink = "book-clubs"

    useEffect(()=>{
        //Make a fetch call to the OpenLibrary API
        fetch("http://openlibrary.org/search.json?q=the+lor")
        .then(res => res.json())
        .then(receivedData => console.log("Received Data", receivedData));
    },[])
    

    return(
        <>
        <DashboardContainer header={dashHeader} body={dashBody}/>
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <NavCard id="my-reading-list" 
                             className="nav-card"
                             header={readingListHeader}
                             body={readingListBody}
                             navButton={readingListButton}
                             navLink={readingListLink}
                             />
                </Col>
                <Col sm={12} md={6}>
                    <NavCard id="my-book-clubs"
                             className="nav-card"
                             header={bookClubHeader}
                             body={bookClubBody}
                             navButton={bookClubButton}
                             navLink={bookClubLink}
                             />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;