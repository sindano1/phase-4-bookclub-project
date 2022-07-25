import React, { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import "./Landing.css";
import { Link } from "react-router-dom";



function Landing(){
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    // useLoginState();
    return(
        <>
        <header style={{textAlign: "center"}}>
            <h1>Overbooked</h1>
            <h3>The best app to engage with your reading.</h3>
        </header>
        <article style={{textAlign: "left", margin: "20px", padding: "20px"}}>
            <header>
                <h1><strong>What is Overbooked?</strong></h1>
            </header>
            <p style={{fontSize:"20px"}}> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>
        </article>
        <article style={{textAlign: "left", margin: "20px", padding: "20px"}}>
            <header>
                <h2>Track Your Books!</h2>
            </header>
            <p style={{fontSize:"20px"}}> One of the main features of Overbooked is being able to keep track of books you read, are currently reading, and want to read in the future. That way no New Year's reading resolution goes unfulfilled! </p>
        </article>
        <article style={{textAlign: "left", margin: "20px", padding: "20px"}}>
            <header>
                <h2>Rate Your Books!</h2>
            </header>
            <p style={{fontSize:"20px"}}> Every time you finish reading a book, you have the option to rate the book and even drop a review to share with the Overbooked community. </p>
        </article>
        
        <p>{isLoggedIn ? null : <Link to="/login"> Login / Create New Account</Link>}</p>
        </>
    )
}

export default Landing;