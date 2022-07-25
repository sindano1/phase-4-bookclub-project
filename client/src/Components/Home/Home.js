import React, { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import useRetrieveUserBooks from "../../CustomHooks/useRetrieveUserBooks";
import "./Home.css"
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavCard from "../NavCard/NavCard";

//A Component that represents the first page that a user lands on after logging in
function Home() {

    useLoginState();
    useRetrieveUserBooks();
   

    const { user, userLibrary } = useContext(UserContext);
    console.log(userLibrary);
    // const navigate = useNavigate();
    //Dashboard Content
    const dashHeader = <h1>Welcome {user.username}!</h1>
    const dashBody = (<Container>
                        <Row>
                            <Col>
                                <p style={{fontSize:"30px"}}>You have read <strong style={{fontSize: "40px"}}>{userLibrary.length !== 0 ? userLibrary.length : "Loading..."}</strong> books so far!</p>
                            </Col>
                        </Row>
                       </Container>)
    const dashboardId = "home-dash"

    //NAVCARD CONTENT
    //Reading List
    const readingListHeader = (<h1>My Library</h1>)
    const readingListBody = (<p>See your current and past books and reviews. Add new books. W</p>)
    const readingListButton = "Go to Your Library"
    const readingListLink = "mylibrary"
    const readingListColor = "#F48B29"
    //Book Clubs
    const bookClubHeader = (<h1>Book Clubs</h1>)
    const bookClubBody = (<p>View, find and join book clubs.</p>)
    const bookClubButton = "My Book Clubs"
    const bookClubLink = "book-clubs"
    const bookClubColor = "#16697A"

    
    return(
        <>
        <DashboardContainer header={dashHeader} body={dashBody} id={dashboardId}/>
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <NavCard id="my-reading-list" 
                             className="nav-card"
                             header={readingListHeader}
                             body={readingListBody}
                             navButton={readingListButton}
                             navLink={readingListLink}
                             backgroundColor = {readingListColor}
                             color="white"
                             />
                </Col>
                <Col sm={12} md={6}>
                    <NavCard id="my-book-clubs"
                             className="nav-card"
                             header={bookClubHeader}
                             body={bookClubBody}
                             navButton={bookClubButton}
                             navLink={bookClubLink}
                             backgroundColor={bookClubColor}
                             color="white"
                             />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;