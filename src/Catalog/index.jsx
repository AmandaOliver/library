import React, {PureComponent} from 'react'
import Book from '../Book'
import { isLibraryInitialized, worker, getBookById } from '../library'
import conf from '../configuration'
import { List, AutoSizer } from 'react-virtualized'

import './styles.scss'
class Catalog extends PureComponent {
  constructor() {
    super()
    this.state = {
      bookIds: new Array(conf.librarySize).fill(),
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
        ...new Array(conf.booksPerPage).fill().map((_, i) => i+indexInit)
      ],
      indexInit: indexInit + conf.booksPerPage,
    })
  }

  render() {
    const rowRenderer = ({ key, index, style }) => {
      const bookData = getBookById(index)
      return bookData ?
        <div key={key} style={style}><Book book={bookData} /></div> :
        <div key={key} style={style}><Book book={{id: index}} /></div>
    }
    return (
      <div className='catalog'>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={conf.librarySize}
              rowHeight={70}
              rowRenderer={rowRenderer.bind(this)}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}

export default Catalog
