import React from 'react'
import Book from '../Book'

import './styles.scss'

const Catalog = ({ booksArray, authorsMap }) => {

    const bookComponentsArray = booksArray.map(book => {
        const author = authorsMap.get(book.authorId)
        return <Book key={book.id} book={book} author={author} />
    })

    return (
        <div className="catalog">
            {bookComponentsArray}
        </div>
    )
}

export default Catalog;
