import React from 'react'
import moment from 'moment'
import './styles.scss'


const Book = ({ book, author }) => {

  const { id, name, genre, publishDate, authorName, authorGender } = book
  const publishDateFormatted = moment(publishDate).format('DD/MM/YYYY')

  return (
    <div className="book">
      <div className='book__property--id'>
        <span >{id})</span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">Name: </span>
        <span className="book__property__value">{name} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">Genre: </span>
        <span className="book__property__value">{genre} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">Publish Date: </span>
        <span className="book__property__value">{publishDateFormatted}</span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">Author Name: </span>
        <span className="book__property__value">{authorName} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">Author Gender: </span>
        <span className="book__property__value">{authorGender} </span>
      </div>
    </div>
  )
}

export default Book;
