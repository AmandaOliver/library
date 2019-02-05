import React, {PureComponent} from 'react'
import Book from '../Book'
import { isLibraryInitialized, worker, getBookById } from '../library'
import conf from '../configuration'
import { List, AutoSizer } from 'react-virtualized';

import './styles.scss'
class Catalog extends PureComponent {
    constructor() {
        super()
        this.state = {
            bookIds: new Array(conf.librarySize).fill(),
            isLoading: true,
            indexInit: 0,
        }
        this.bindedInitializeComponent = this.initializeComponent.bind(this)
    }

    componentDidMount() {
        // listen to the web worker to check when to render the first elements
        worker.addEventListener('message', this.bindedInitializeComponent);
    }
    initializeComponent(event) {
        const needsToLoadInitialBooks = isLibraryInitialized()
        const unsubscribeFromWorker = () =>
            worker.removeEventListener('message', this.bindedInitializeComponent)
        const setIsLoadingFalse = () => this.setState({ isLoading: false })

        console.info('Can I render something?: ', needsToLoadInitialBooks )
        if (needsToLoadInitialBooks) {
            unsubscribeFromWorker()
            setIsLoadingFalse()
            this.getMoreBooks()
        }
    }

    getMoreBooks() {
        const { bookIds, indexInit } = this.state
        const indexEnd = indexInit + conf.booksPerPage
        console.info(`Adding Ids from ${indexInit} to ${indexEnd -1}`)
        this.setState({
            bookIds: [
                ...bookIds,
                ...new Array(conf.booksPerPage).fill().map((_, i) => getBookById(i+indexInit))
            ],
            indexInit: indexEnd,
        })
    }

    render() {
        const rowRenderer = ({ key, index, style }) => {
            const bookData = getBookById(index)
            return bookData ?
                <div key={key} style={style}><Book key={key} book={bookData} /></div> :
                <div key={key} style={style}>Loading...</div>
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

export default Catalog;
