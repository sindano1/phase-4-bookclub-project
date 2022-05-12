import React from "react";
import "./BookClub.css";
import ClubCard from '../ClubCard/ClubCard';
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import { useEffect, useState, useContext } from 'react'

function BookClub() {
    useLoginState();

    const [clubs, setClubs] = useState([])
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    useEffect(() => {
        fetch(`/your-clubs`)
            .then((r) => r.json())
            .then(club => setClubs(club));
    }, []);

    function renderClubs() {

        if (clubs.length === 0) {
            return <p>Loading...</p>
        } else {
            const mappedclubs = clubs.map(club => {
            return <ClubCard club={club} />
            })
        return mappedclubs
        }
    }

    return (
        <>
            <h1>BookClub Page</h1>
            {renderClubs()}
        </>
    )
}

export default BookClub;