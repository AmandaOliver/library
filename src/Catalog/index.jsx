import React from 'react'
import Book from '../Book'

import './styles.scss'

const Catalog = ({books}) => {
    const bookComponentsArray = books.map(book => <Book key={book.name} book={book} />)
    return (
        <div className="catalog">
            {[...bookComponentsArray]}
        </div>
    )
}

export default Catalog;
