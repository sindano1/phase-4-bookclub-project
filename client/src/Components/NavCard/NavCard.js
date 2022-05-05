import React from "react";
import "./NavCard.css"

function NavCard({header, body}){
    return(
        <article>
            <header>
                {header}
            </header>
            <section>
                {body}
            </section>
        </article>
    )
}

export default NavCard;