import React, {PureComponent} from 'react'
import Book from '../Book'
import { isLibraryInitialized, getLibrary, worker } from '../library'
import './styles.scss'

class Catalog extends PureComponent {
    constructor() {
        super()
        this.state = {
            indexInit: 0,
            books: [],
            isLoading: true
        }

        window.onscroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement
            const needsToLoadMore =  window.innerHeight + scrollTop  === offsetHeight
            if (needsToLoadMore) {
                this.getMoreBooks()
            }
        }
        
        // This could be done better, is listening to the webworker to initialize the component
        worker.addEventListener('message', event => {
            if (this.state.isLoading && isLibraryInitialized()) {
                this.setState({
                    ...this.state,
                    isLoading: false,
                })
                this.getMoreBooks()
            }
        });
    }
    getMoreBooks() {
        const { books, indexInit } = this.state
        const indexEnd = indexInit + 10
        this.setState({
            books: [
                // this could be done better, we add new books to the existent ones,
                // when scrolling to the end of the list the million books will be on memory
                ...books,
                ...getLibrary().slice(indexInit, indexEnd)
            ],
            indexInit: indexEnd,
        })
    }
    render() {
        const bookComponents = this.state.books.map(book => {
            return <Book key={book.id} book={book} />
        })
        return (
            <div className="catalog">
                {bookComponents}
            </div>
        )
    }
}

export default Catalog;
