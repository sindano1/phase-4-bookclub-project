import React, { useState, useEffect, useContext } from "react";
import "./BookClub.css";
import ClubCard from '../ClubCard/ClubCard';
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import useRetrieveUserBooks from "../../CustomHooks/useRetrieveUserBooks";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function BookClub() {

    useLoginState();
    useRetrieveUserBooks();

    // const [clubs, setClubs] = useState([])
    const { user, setUser, isLoggedIn, setIsLoggedIn, userClubs, setUserClubs } = useContext(UserContext);
    const [clubsIsLoaded, setClubsIsLoaded] = useState(false)

    const [showManualModal, setShowManualModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [addClub, setAddClub] = useState({
        "name": "",
        // "admin" : "",
        "description": "",
        "image": ""
    });
    const { name, admin, description, image } = addClub;


    // Render clubs on page
    useEffect(() => {
        fetch(`/your-clubs`)
            .then((r) => r.json())
            .then(userClubs => {
                setUserClubs(userClubs)
                setClubsIsLoaded(true)
            });
    }, [setUserClubs]);


    // Modal for club creation
    function handleManualModalClose() {
        setAddClub({
            "name": "",
            "admin": "",
            "description": "",
            "image": ""
        })
        setShowManualModal(false);
    }

    function handleClose() {
        setShowModal(false);
    }

    async function handleCreateClubSubmit(e) {
        e.preventDefault();
        console.log(addClub)

        // POST to clubs
        const clubConfigObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepted": "application/json"
            },
            body: JSON.stringify(addClub)
        }

        const res = await fetch("/clubs", clubConfigObj)
        if (res.ok) {
            const newClub = await res.json()
            const newMember = {
                "user_id" : user.id,
                "club_id" : newClub.id
            }

            const memberConfigObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accepted": "application/json"
                },
                body: JSON.stringify(newMember)
            }
    
            const resTwo = await fetch("/club_members", memberConfigObj)
                    if (resTwo.ok) {
                        resTwo.json()
                    } else {
                        console.log("Oops. Something went wrong.")
                    }
                    setUserClubs([...userClubs, newClub])
                   console.log(userClubs)
                } else {
                    console.log("Oops. Something went wrong.")
                }
                
        setAddClub({
            "name": "",
            // "admin" : "",
            "description": "",
            "image": ""
        })
        setShowManualModal(false);
    }

    function handleManualFormChange(e) {
        console.log(e.target.name)
        setAddClub({ ...addClub, [e.target.name]: e.target.value })
    }

    function renderClubs() {
        if (!clubsIsLoaded) {
            return <p>Loading...</p>
        } else {
            if (userClubs.length === 0) {
                return (
                    <>
                        <p>You are not currently part of any clubs</p>
                        <p>Join a book club! Or Create one!</p>
                    </>
                )
            } else {
                const mappedclubs = userClubs.map(club => {
                    return <ClubCard club={club} />
                })

                return mappedclubs
            }
        }
    }



    return (
        <>
            <h1>{user.username}'s Book Clubs</h1>
            <Button onClick={setShowManualModal}>Create a Club</Button>

            {/* New club modal */}
            <Modal show={showManualModal} onHide={handleManualModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a club:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateClubSubmit}>
                        <Form.Group>
                            <Form.Label>Club Name:</Form.Label>
                            <Form.Control required type="text" name="name" value={name} onChange={handleManualFormChange} placeholder="Club Name"></Form.Control>
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Admin:</Form.Label>
                            <Form.Control required type="text" name="admin" value={admin} onChange={handleManualFormChange} placeholder="Admin"></Form.Control>
                        </Form.Group> */}
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" name="description" value={description} onChange={handleManualFormChange} placeholder="Description"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image URL (optional):</Form.Label>
                            <Form.Control type="text" name="image" value={image} onChange={handleManualFormChange} placeholder="Image"></Form.Control>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleManualModalClose}>Cancel</Button>
                            <Button variant="primary" type="submit" >Add Club</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>


            {/* Show all clubs */}
            {renderClubs()}
        </>
    )
}

export default BookClub;