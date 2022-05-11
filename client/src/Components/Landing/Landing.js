import React, { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import "./Landing.css";
import { Link } from "react-router-dom";



function Landing(){
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    useLoginState();
    return(
        <>
        <header style={{textAlign: "center"}}>
            <h1>Book Club App</h1>
            <h3>The best app to engage with your reading.</h3>
        </header>
        <article style={{textAlign: "left"}}>
            <header>
                <strong>What is Book Club App?</strong>
            </header>
            <p> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>
            <p> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>
            <p> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>
            <p> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>
            <p> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>
            <p> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>
            <p> Book Club App helps you get the most out of your reading experience by helping you track your reads and start a book club with friends.</p>

        </article>
        
        <p>{isLoggedIn ? null : <Link to="/login"> Login / Create New Account</Link>}</p>
        </>
    )
}

export default Landing;