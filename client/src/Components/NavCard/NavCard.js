import React from "react";
import "./NavCard.css"
import Button from 'react-bootstrap/Button';

//A component for product cards that leads the user to a major page of the website
function NavCard({header, body, navButton, navLink, id, backgroundColor, color}){
    return(
        <article id={id} className="nav-card" style={{backgroundColor: backgroundColor, color: color}}>
            <header className="nav-card-header">
                {header}
            </header>
            <section className="nav-card-header">
                {body}
            </section>
            
            <Button href={navLink}>
                {navButton}
            </Button>
            
        </article>
    )
}

export default NavCard;