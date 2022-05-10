import React from 'react'
import './ResultsCard.css'

function ResultsCard({ searchData }) {
    //two buttons add/remove (or conditional rendering from add to remove)

    function renderSearchData() {
        // This if is to prevent the empty state array from erroring the render
        if (searchData.length === 0) {
            // The return here has not loaded
            return <p>Loading...</p>
        } else {
            // Map through the first 10 results to return cover art, title, author
            const mappedResults = searchData.docs.slice(0, 10).map(book => {
                return <>
                    {book.isbn ? <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} /> : <p>"Book Cover Unavailable"</p>}
                    <p> {book.title}</p>
                    <p>{book.author_name[0]}</p>
                </>
            }
            )
            // Preventing errors
            if (mappedResults === undefined) {
                return <p>Loading...</p>
            } else {
                return mappedResults;
            }
        }
    }

    return (
        <article className="results-card">
            <h1>Results Card</h1>
            <div>{searchData ? renderSearchData() : null}</div>
        </article>
    )


}
export default ResultsCard