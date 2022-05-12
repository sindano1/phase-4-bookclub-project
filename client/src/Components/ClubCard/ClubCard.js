import React from "react";
import "./ClubCard.css"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from "../UserContext/UserContext";
import useLoginState from "../../CustomHooks/useLoginState";



function ClubCard({ club }) {

    return (
        <article className="club-card">
            <h2>{club.name}</h2>
            <p>Description: {club.description}</p>
            <img className="club-image" src={club.image}/>
        </article>
    )
}

export default ClubCard;