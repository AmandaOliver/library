import React, { PureComponent } from 'react'
import Header from './Header'
import Catalog from './Catalog'
import { Provider } from './context'
import {sortArrayBooks, filterArrayBooks, getBookById} from './libraryLoader'
import config from './configuration'

class Library extends PureComponent {
  constructor() {
    super()

    this.actions = {
      getLibrarySize: this._getLibrarySize,
      getBookById: this._getBookById,
      sortByProperty: this._sortByProperty,
      filterBooks: this._filterBooks,
      resetFilter: this._resetFilter,
    }

    this.state = {
      filteredBooksArray: [],
      isFiltered: false,
      sortedBy: 'id',
      ...this.actions,
    }

  }
  _resetFilter = () => {
    this.setState({
      filteredBooksArray: [],
      isFiltered: false
    })
  }
  _getLibrarySize = () => this.state.isFiltered ? this.state.filteredBooksArray.length : config.librarySize
  _getBookById = id => this.state.isFiltered ? this.state.filteredBooksArray[id] : getBookById(id)
  _sortByProperty = property => {
    const sortBooks = (property, books) => {
      if (property === 'id') {
        books.sort((bookA, bookB) => bookA.id - bookB.id)
      }
      books.sort((bookA, bookB) => bookA.bookData[property] < bookB.bookData[property] ? -1 : 1)
    }
    if (this.state.isFiltered) {
      sortBooks(property, this.state.filteredBooksArray)
    }
    sortArrayBooks(property)
    this.setState({sortedBy: property})
  }

  _filterBooks = (bookProperties) => {
    this.setState({
      filteredBooksArray: filterArrayBooks(bookProperties),
      isFiltered: true
    })
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
