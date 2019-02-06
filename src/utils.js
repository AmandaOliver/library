import config from './configuration'
import React from 'react'
export const sortBooks = (property, books) => {
  if (property === 'id') {
    books.sort((bookA, bookB) => bookA.id - bookB.id)
  }
  books.sort((bookA, bookB) => bookA.bookData[property] < bookB.bookData[property] ? -1 : 1)
}


export const bookPropertiesDropDown = Object.keys(config.bookProperties).map(property =>
  <option key={property} value={property} label={config.bookProperties[property].label} />)


export const getPropertyValues = property =>
  config.bookProperties[property].values
