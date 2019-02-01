import React from 'react'
import moment from 'moment'
import './styles.scss'

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const createProperties = (book) =>
  Object.keys(book).map(property => {
    const propertyName = capitalize(property)
    const propertyValue = book[property] instanceof Date ?
      moment(book[property]).format('DD/MM/YYYY') :
      book[property]

    return (
      <div className='book__property'>
        <span className="book__property__name">{propertyName}: </span>
        <span className="book__property__value">{propertyValue}</span>
      </div>
    )
  })

const Book = ({ book }) => {
  return (
    <div className="book">
      {[...createProperties(book)]}
    </div>
  )
}

export default Book;
