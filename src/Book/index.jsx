import React from 'react'
import config from '../configuration'

import './styles.scss'


const Book = ({ book }) => {
  const { bookProperties } = config
  const { genre, name, publishDate, authorName, authorGender } = book.bookData
  const publishDateFormatted = publishDate.toLocaleDateString('en-gb', config.dateFormat)

  return (
    <div className="book">
      <div className='book__property book__property--id'>
        <span className="book__property__value">{book.id})</span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties.name.label}: </span>
        <span className="book__property__value--long">{name} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties.genre.label}:  </span>
        <span className="book__property__value">{genre} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties.publishDate.label}: </span>
        <span className="book__property__value">{publishDateFormatted}</span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties.authorName.label}: </span>
        <span className="book__property__value--long">{authorName} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties.authorGender.label}:  </span>
        <span className="book__property__value">{authorGender} </span>
      </div>
    </div>
  )
}

export default Book
