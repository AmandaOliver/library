import config from './configuration'
import React from 'react'

export const sortBooks = (property, books) => {
  if (property === 'id') {
    return books.sort((bookA, bookB) => bookA.id - bookB.id)
  }
  return books.sort((bookA, bookB) => bookA.bookData[property] < bookB.bookData[property] ? -1 : 1)
}

export const getBookPropertiesDropDown = (conf=config) => Object.keys(conf.bookProperties).map(property =>
  <option key={property} value={property} label={conf.bookProperties[property].label} />)

export const getPropertyValues = (property, conf=config) =>  conf.bookProperties[property].values
