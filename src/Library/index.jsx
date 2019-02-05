import React, { PureComponent } from 'react'
import Header from '../Header'
import Catalog from '../Catalog'
import { Provider } from '../context'
import lib from '../libraryLoader'
import config from '../configuration'
import { sortBooks } from '../utils'

class Library extends PureComponent {
  constructor() {
    super()

    this.actions = {
      getLibrarySize: this._getLibrarySize,
      getBookById: this._getBookById,
      sortByProperty: this._sortByProperty,
      filterByProperties: this._filterByProperties,
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
  _getBookById = id => this.state.isFiltered ? this.state.filteredBooksArray[id] : lib.getBookById(id)
  _sortByProperty = property => {
    if (this.state.isFiltered) {
      sortBooks(property, this.state.filteredBooksArray)
    }
    lib.sortByProperty(property)
    this.setState({sortedBy: property})
  }

  _filterByProperties = (paramsArray) => {
    this.setState({
      filteredBooksArray: lib.filterByProperties(paramsArray),
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
