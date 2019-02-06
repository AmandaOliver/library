import React, {PureComponent} from 'react'
import Book from '../Book'
import { Consumer } from '../context'
import config from '../configuration'
import { List, AutoSizer } from 'react-virtualized'
import {worker, isLibraryInitialized} from '../libraryLoader'
import './styles.scss'

class Catalog extends PureComponent {
  constructor() {
    super()
    this.state = {
      bookIds:[],
      isLoading: true,
      indexInit: 0,
    }
    this.bindedInitHandler = this.initHandler.bind(this)
  }

  componentDidMount() {
    // listen to the web worker to check when to render the first elements
    worker.addEventListener('message', this.bindedInitHandler)
  }

  initHandler(event) {
    if (isLibraryInitialized()) {
      worker.removeEventListener('message', this.bindedInitHandler)
      this.setState({ isLoading: false })
      this.getMoreBooks()
    }
  }

  getMoreBooks() {
    const { bookIds, indexInit } = this.state
    this.setState({
      bookIds: [
        ...bookIds,
        ...new Array(config.booksPerPage).fill().map((_, i) => i+indexInit)
      ],
      indexInit: indexInit + config.booksPerPage,
    })
  }

  render() {
    return (
      <Consumer>
        {({ isFiltered, getBookById, getLibrarySize }) => {
          const rowRenderer = ({ key, index, style }) => {
            const book = getBookById(index)
            return book && <div key={key} style={style}><Book style={style} book={book} /></div>
          }
          return (
            <div className='catalog'>
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={getLibrarySize()}
                    rowHeight={config.rowHeight}
                    rowRenderer={rowRenderer.bind(this)}
                  />
                )}
              </AutoSizer>
            </div>
          )
        }}
      </Consumer>

    )
  }
}

export default Catalog
