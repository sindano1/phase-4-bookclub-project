import React from 'react'
import './ResultsCard.css'

function ResultsCard({ searchData }) {
    //render an image of the book
    //the title, author, genre(?)
    //two buttons add/remove (or conditional rendering from add to remove)

    
    const mapSearchData = searchData
    .docs
    .slice(0, 10)
    .map(book => {
        const title = book.title
        const author = book.author_name
        const isbn = book.isbn[0]
        
        // fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`)
        // .then(res => res.json())
        // .then(bookImg => console.log(bookImg))
        return <p>{(`${title} ${author} ${isbn}`)}</p>
    })
    

    


return (
    <article className="results-card">
        <h1>Results Card</h1>
        {searchData.length === 0 ? <p>Loading...</p> : <p> {mapSearchData}</p>}
    </article>
)


}
export default ResultsCard