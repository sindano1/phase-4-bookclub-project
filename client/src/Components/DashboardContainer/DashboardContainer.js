import React from "react";
import "./DashboardContainer.css"

function DashboardContainer({header, body}){
    return(
        <article className="jumbotron">
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