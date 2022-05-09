import React from 'react'
import './ResultsCard.css'

function ResultsCard({searchData}){
    //render an image of the book
    //the title, author, genre(?)
    //two buttons add/remove (or conditional rendering from add to remove)


return(
    <article className = "results-card">
    <h1>Results Card</h1>
    {searchData.length === 0 ? <p>Loading...</p> : <p>{searchData.docs[0].author_name}</p>}
    </article>
)


}
export default ResultsCard