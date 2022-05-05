import React from "react";
import "./NavCard.css"
import Button from 'react-bootstrap/Button';

//A component for product cards that leads the user to a major page of the website
function NavCard({header, body, navButton, navLink}){
    return(
        <article>
            <header className="nav-card-header">
                {header}
            </header>
            <section className="nav-card-header">
                {body}
            </section>
            <nav>
                <Button href={navLink}>
                    {navButton}
                </Button>
            </nav>
        </article>
    )
}

export default NavCard;