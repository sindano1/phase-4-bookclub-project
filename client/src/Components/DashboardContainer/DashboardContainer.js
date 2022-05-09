import React from "react";
import "./DashboardContainer.css"

function DashboardContainer({header, body, id}){
    return(
        <article className="jumbotron" id={id}>
            <header>
                {header}
            </header>
            <section>
                {body}
            </section>
        </article>
    )
}

export default DashboardContainer;