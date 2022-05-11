import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import "./NavBar.css"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import Modal from 'react-bootstrap/Modal';


function NavBar(){

    useLoginState();

    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const  navigate = useNavigate();
    
    let snackbarClass = ""

    function handleLogout(){
        const configObj = {
            method: "DELETE"
        }
        fetch("/logout", configObj)
        .then(res => {
            if (res.ok){
                console.log("logged out");
                setIsLoggedIn(false) ;
                navigate("login");
            }
        })
    }
    return(
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Overbooked</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="mylibrary">Library</Nav.Link>
                    <Nav.Link href="book-clubs">Book Clubs</Nav.Link>
                    <Nav.Link href="/">About</Nav.Link>
                    { isLoggedIn ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link> : <Nav.Link href="login">Login</Nav.Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div id="snackbar" className={snackbarClass}>Logout Successful.</div>
        </>
    )
}

export default NavBar;