import React, { PureComponent } from 'react'
import Header from '../Header'
import Catalog from '../Catalog'
import { Provider } from '../context'
import { booksArray } from '../libraryLoader'
import config from '../configuration'

class Library extends PureComponent {
  constructor() {
    super()

    this.actions = {
      getLibrarySize: this._getLibrarySize,
      getBookById: this._getBookById,
      sortByProperty: this._sortByProperty,
      filterByProperties: this._filterByProperties,
    }

    this.state = {
      filteredBooksArray: [],
      isFiltered: false,
      ...this.actions,
    }

  }

  _getLibrarySize = () => this.state.isFiltered ? this.state.filteredBooksArray.length : config.librarySize
  _getBookById = id => this.state.isFiltered ? this.state.filteredBooksArray[id] : booksArray[id]
  _sortByProperty = property => booksArray.sort((a, b) => a[property] < b[property]) ? -1 : 1

  _filterByProperties = (paramsArray) => {
    this.setState({
      filteredBooksArray: booksArray.filter(({ bookData }) => paramsArray.every(({ property, value }) => {
        if (property === 'publishDate') {
          return bookData[property].getTime() === value.getTime()
        } else {
          return bookData[property] === value
        }
      }))
    },
    () => this.setState({isFiltered: true})
    )
  }

  render() {
    return (
      <Provider value={this.state}>
        <Header />
        <Catalog />
      </Provider>
    )
  }
}

export default Library
