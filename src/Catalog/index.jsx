import React, {PureComponent} from 'react'
import Book from '../Book'
import { isLibraryInitialized, worker, getBookById } from '../library'
import conf from '../configuration'

import './styles.scss'

class Catalog extends PureComponent {
    constructor() {
        super()
        this.state = {
            indexInit: 0,
            bookIds: [],
            isLoading: true
        }

        window.onscroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement
            const needsToLoadMore =  window.innerHeight + scrollTop  === offsetHeight
            if (needsToLoadMore) {
                this.getMoreBooks()
            }
        }
        this.bindedInitializeComponent = this.initializeComponent.bind(this)
        // listen to the web worker to check when to render the first elements
        worker.addEventListener('message', this.bindedInitializeComponent);
    }

    initializeComponent(event) {
        const needsToLoadInitialBooks = this.state.isLoading === true && isLibraryInitialized()
        const unsubscribeFromWorker = () => worker.removeEventListener('message', this.bindedInitializeComponent)
        const setIsLoadingFalse = () => this.setState({ ...this.state, isLoading: false })

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
                // THIS NEEDS IMPROVEMENT: we are rendering all books from 0 to the current
                // position in the scroll, when we scroll towards the end of the list it will
                // have to render all the books at the same time
                ...bookIds,
                ...new Array(conf.booksPerPage).fill().map((_, i) => i+indexInit)
            ],
            indexInit: indexEnd,
        })
    }
    render() {
        const bookComponents = this.state.bookIds.map(bookId => {
            return <Book key={bookId} book={getBookById(bookId)} />
        })
        return (
            <div className="catalog">
                {bookComponents}
            </div>
        )
    }
}

export default Catalog;
