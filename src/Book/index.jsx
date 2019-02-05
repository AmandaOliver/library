import React from 'react'
import moment from 'moment'
import conf from '../configuration'

import './styles.scss'


const Book = ({ book }) => {
  const { bookProperties } = conf
  const { id, name, genre, publishDate, authorName, authorGender } = book
  const publishDateFormatted = moment(publishDate).format('DD/MM/YYYY')

  return (
    <div className="book">
      <div className='book__property book__property--id'>
        <span className="book__property__value">{id})</span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties[0]}: </span>
        <span className="book__property__value--long">{name} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties[1]}:  </span>
        <span className="book__property__value">{genre} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties[2]}: </span>
        <span className="book__property__value">{publishDateFormatted}</span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties[3]}: </span>
        <span className="book__property__value--long">{authorName} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties[4]}:  </span>
        <span className="book__property__value">{authorGender} </span>
      </div>
    </div>
  )
}

export default Book;
