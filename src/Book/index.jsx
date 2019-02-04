import React from 'react'
import moment from 'moment'
import conf from '../configuration'

import './styles.scss'


const Book = ({ book, author }) => {
  const { bookProperties } = conf
  const { id, name, genre, publishDate, authorName, authorGender } = book
  const publishDateFormatted = moment(publishDate).format('DD/MM/YYYY')

  return (
    <div className="book" style={{top:id * 140 % 100000 + 'px'}}>
      <div className='book__property--id'>
        <span >{id})</span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties[0]}: </span>
        <span className="book__property__value">{name} </span>
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
        <span className="book__property__value">{authorName} </span>
      </div>
      <div className='book__property'>
        <span className="book__property__name">{bookProperties[4]}:  </span>
        <span className="book__property__value">{authorGender} </span>
      </div>
    </div>
  )
}

export default Book;
