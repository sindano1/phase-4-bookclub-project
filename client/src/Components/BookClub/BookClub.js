import React, { useState, useEffect, useContext } from "react";
import "./BookClub.css";
import ClubCard from '../ClubCard/ClubCard';
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";
import useRetrieveUserBooks from "../../CustomHooks/useRetrieveUserBooks";

function BookClub() {

    useLoginState();
    useRetrieveUserBooks();

    const [clubs, setClubs] = useState([])
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const [clubsIsLoaded, setClubsIsLoaded] = useState(false)
    

    useEffect(() => {
        fetch(`/your-clubs`)
            .then((r) => r.json())
            .then(club => {
                setClubs(club)
                setClubsIsLoaded(true)
            });
    }, []);

    function renderClubs() {

        if (!clubsIsLoaded) {
            return <p>Loading...</p>
        } else {
            if(clubs.length === 0){
                return (
                    <>
                    <p>You are not currently part of any clubs</p>
                    <p>Join a book club! Or Create one!</p>
                    </>
                )
            }else{
                const mappedclubs = clubs.map(club => {
                    return <ClubCard club={club} />
                    })

                return mappedclubs
            }
            
        
        }
    }

    return (
        <>
            <h1>{user.username}'s Book Clubs</h1>
            {renderClubs()}
        </>
    )
}

export default BookClub;